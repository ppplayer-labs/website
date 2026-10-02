import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { Link, routing } from '@/i18n/routing';
import Image from 'next/image';
import AdUnit from '@/components/AdUnit';

const ADSENSE_SUPPORTED_LOCALES = new Set([
  'ar', 'bn', 'cs', 'da', 'de', 'en', 'es', 'fil', 'fr', 'hi', 'hu', 
  'id', 'it', 'ja', 'ko', 'lv', 'pl', 'pt-BR', 'ru', 'sv', 'tr', 'zh'
]);

export async function generateMetadata({params}: {params: Promise<{locale: string, slug: string}>}) {
  const {locale, slug} = await params;
  const post = getPostBySlug(slug, locale) || getPostBySlug(slug, 'en');
  
  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: `${post.title} | PPPlayer Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export function generateStaticParams() {
  const params: { locale: string, slug: string }[] = [];
  
  routing.locales.forEach((locale) => {
    const posts = getAllPosts('en');
    posts.forEach((post) => {
      params.push({ locale, slug: post.slug });
    });
  });
  
  return params;
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');

  let post = getPostBySlug(slug, locale);
  let isFallback = false;

  if (!post) {
    if (locale !== 'en') {
        post = getPostBySlug(slug, 'en');
        isFallback = true;
    }
    
    if (!post) {
        notFound();
    }
  }

  const isAdEligible = !isFallback && !post.isDraft && ADSENSE_SUPPORTED_LOCALES.has(locale) && post.content.length > 500;
  
  // Split content robustly for ad injection
  let contentParts = [post.content];
  
  if (isAdEligible) {
    // Split by paragraphs (double newline)
    const paragraphs = post.content.split(/\n\n+/);
    
    if (paragraphs.length >= 4) {
      // Find a good spot for the first ad (around 30% into the article, at least after paragraph 2)
      const targetLength1 = post.content.length * 0.3;
      let currentLength = 0;
      let splitIndex1 = 2; // Default to after 2nd paragraph
      
      for (let i = 0; i < paragraphs.length; i++) {
        currentLength += paragraphs[i].length;
        if (currentLength > targetLength1 && i >= 2) {
          splitIndex1 = i + 1;
          break;
        }
      }
      
      // Find a good spot for the second ad (around 70% into the article, if long enough)
      let splitIndex2 = -1;
      if (post.content.length > 3000 && paragraphs.length >= splitIndex1 + 4) {
        const targetLength2 = post.content.length * 0.7;
        currentLength = 0;
        for (let i = 0; i < paragraphs.length; i++) {
          currentLength += paragraphs[i].length;
          if (currentLength > targetLength2 && i >= splitIndex1 + 3) {
            splitIndex2 = i + 1;
            break;
          }
        }
      }
      
      if (splitIndex2 !== -1) {
        contentParts = [
          paragraphs.slice(0, splitIndex1).join('\n\n'),
          paragraphs.slice(splitIndex1, splitIndex2).join('\n\n'),
          paragraphs.slice(splitIndex2).join('\n\n')
        ];
      } else {
        contentParts = [
          paragraphs.slice(0, splitIndex1).join('\n\n'),
          paragraphs.slice(splitIndex1).join('\n\n')
        ];
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-bg-base)] pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <Link href="/blog" className="text-slate-400 hover:text-white transition-colors mb-8 inline-block">
              {t('back')}
            </Link>
            
            {isFallback && (
              <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200/80">
                {t('translationUnavailable')}
              </div>
            )}

            <div className="flex items-center gap-3 text-sm font-medium text-slate-400 mb-6">
              <span className="text-blue-400">{t.has(`categories.${post.category.toLowerCase()}`) ? t(`categories.${post.category.toLowerCase()}`) : post.category}</span>
              <span>•</span>
              <span>{post.readTime} {t('minRead')}</span>
            </div>
            
            <h1 lang={isFallback ? "en" : locale} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  PP
                </div>
                <div>
                  <div className="text-white font-medium">{post.author}</div>
                  <div className="text-slate-400 text-sm">{t('publishedOn')} {post.date}</div>
                </div>
              </div>
            </div>

            {post.coverImage && (
              <div className="mb-12 aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 relative">
                 <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
              </div>
            )}
          </div>

          <div lang={isFallback ? "en" : locale} className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-img:rounded-xl">
            {isAdEligible && contentParts.length > 1 ? (
              <>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentParts[0]}</ReactMarkdown>
                <AdUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID} />
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentParts[1]}</ReactMarkdown>
                
                {contentParts.length > 2 && (
                  <>
                    <AdUnit slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID_LONG} />
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentParts[2]}</ReactMarkdown>
                  </>
                )}
              </>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
