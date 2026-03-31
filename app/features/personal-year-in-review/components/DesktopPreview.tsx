'use client';

import Image from 'next/image';

interface DesktopPreviewProps {
  imageUrls: string[];
  isGenerating: boolean;
}

const DesktopPreview = ({
  imageUrls,
  isGenerating
}: DesktopPreviewProps): React.JSX.Element => {
  return (
    <div className="hidden min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8 sm:flex">
      <div className="w-full max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-lg text-slate-600">Preview of shareable images</p>
        </div>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
            <p className="text-lg text-slate-600">Generating your images...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {imageUrls.map((url, index) => (
              <div
                key={url}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative aspect-[9/16]">
                  {url ? (
                    <Image
                      src={url}
                      alt={`Year in Review Card ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-200">
                      <p className="text-slate-500">Loading...</p>
                    </div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">
                    Card {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopPreview;
