type StatCardProps = {
  label: string;
  value: string;
  sublabel: string;
  delta?: string;
  deltaPositive?: boolean;
};

export function StatCard({ label, value, sublabel, delta, deltaPositive }: StatCardProps) {
  return (
    <div className="bg-[#101012] border border-[#1F1F22] rounded-[10px] p-6 flex flex-col gap-3 hover:border-[#2A2A2E] transition-colors">
      <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#6B6B70]">
        {label}
      </span>
      <span className="mono text-[36px] font-medium text-white leading-none">
        {value}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#6B6B70]">{sublabel}</span>
        {delta && (
          <span
            className={`mono text-[12px] font-medium ${
              deltaPositive ? "text-[#D4FF3A]" : "text-[#FF4444]"
            }`}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
