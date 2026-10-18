'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Smartphone, Terminal, Copy, Check } from 'lucide-react'

export interface DownloadOption {
  id: string;
  name: string;
  badge?: string;
  isAvailable: boolean;
  href: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
  isExternal?: boolean;
}

interface DownloadOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  options: DownloadOption[];
  cancelText?: string;
  installCommand?: string;
}

export function DownloadOptionsModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  options, 
  cancelText = "Cancel",
  installCommand,
}: DownloadOptionsModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!installCommand) return;
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = installCommand;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#050505] text-white border border-white/10 shadow-2xl rounded-3xl p-8 max-w-sm w-full relative text-left"
          >
            <div className="w-12 h-12 bg-white/5 text-white/50 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Download className="w-5 h-5" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {options.map((option) => (
                <a
                  key={option.id}
                  href={option.isAvailable ? option.href : '#'}
                  onClick={(e) => {
                    if (!option.isAvailable) e.preventDefault();
                    else if (option.onSelect) option.onSelect();
                  }}
                  className={`relative flex items-center p-4 rounded-2xl border transition-all duration-300 group ${
                    option.isAvailable 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1' 
                      : 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                  }`}
                  download={option.isAvailable && !option.isExternal ? true : undefined}
                  target={option.isExternal ? "_blank" : undefined}
                  rel={option.isExternal ? "noopener noreferrer" : undefined}
                >
                  <div className="flex-shrink-0">
                    {option.icon || <Smartphone className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />}
                  </div>
                  <div className="flex-grow flex flex-col items-start text-left ml-4">
                    <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                      {option.name}
                    </span>
                    {!option.isAvailable && option.badge && (
                      <span className="text-[10px] font-medium tracking-wider text-white/50 uppercase mt-0.5">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  {option.isAvailable && (
                    <div className="flex-shrink-0">
                      {option.isExternal ? (
                        <svg className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      )}
                    </div>
                  )}
                </a>
              ))}
            </div>

            {installCommand && (
              <div className="mb-6 p-3.5 bg-white/[0.04] border border-white/10 rounded-2xl flex items-center justify-between font-mono text-xs text-white/90">
                <div className="flex items-center gap-2.5 overflow-x-auto mr-2 min-w-0">
                  <Terminal className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate select-all">{installCommand}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors flex items-center gap-1.5 flex-shrink-0 text-xs font-sans font-medium"
                  aria-label="Copy terminal install command"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/60" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-white text-black font-semibold rounded-full py-3 hover:bg-slate-200 transition-colors"
            >
              {cancelText}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
