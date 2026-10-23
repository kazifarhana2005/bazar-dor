

export default function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-[1120px] px-4 pt-5">
      <div className="flex min-h-[155px] items-center justify-between gap-4 rounded-2xl border border-[#e4ebe5] bg-[#fbfdfb] px-6 py-5 sm:px-8 md:px-10">

        {/* Left Content */}
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-[#e3f5e9] px-3 py-1 text-[11px] font-medium text-[#16864b]">
            শুক্রবার, ২৩ অক্টোবর, ২০২৬
          </span>

          <h1 className="mt-2 text-xl font-bold leading-tight text-[#202a23] sm:text-2xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-2 max-w-[560px] text-xs leading-5 text-[#737c75] sm:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য নিত্য
            প্রয়োজনীয় পণ্যের বাজারদর দেখুন। সর্বশেষ বাজারদর
            এক জায়গায় সহজেই জেনে নিন।
          </p>

          <button
            type="button"
            className="mt-4 rounded-md bg-[#078b45] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#06763b]"
          >
            আজকের বাজার দেখুন
          </button>
        </div>

        {/* Basket Image */}
        <div className="flex h-[115px] w-[130px] shrink-0 items-center justify-center sm:w-[150px] md:mr-2">
          <img
            src="/bazar-hero.png"
            alt="সবজির ঝুড়ি"
            className="h-full w-full object-contain"
          />
        </div>

      </div>
    </section>
  );
}
