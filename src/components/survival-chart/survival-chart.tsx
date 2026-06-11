const DATA = [
  { year: 0, value: 100 },
  { year: 1, value: 65 },
  { year: 2, value: 37 },
  { year: 3, value: 20 },
  { year: 4, value: 12 },
  { year: 5, value: 7 },
];

const X_LABELS = ["1 ano", "2 anos", "3 anos", "4 anos", "5 anos"];
const Y_TICKS = [100, 75, 50, 25, 0];
const COLOR = "#E05555";

function catmullRomPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const pp = i > 1 ? pts[i - 2] : { x: 2 * p0.x - p1.x, y: 2 * p0.y - p1.y };
    const pn =
      i < pts.length - 1
        ? pts[i + 1]
        : { x: 2 * p1.x - p0.x, y: 2 * p1.y - p0.y };
    const cp1x = p0.x + (p1.x - pp.x) / 6;
    const cp1y = p0.y + (p1.y - pp.y) / 6;
    const cp2x = p1.x - (pn.x - p0.x) / 6;
    const cp2y = p1.y - (pn.y - p0.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export function SurvivalChart() {
  const ml = 72;
  const mr = 190;
  const mt = 65;
  const mb = 44;
  const W = 900;
  const H = 360;
  const cw = W - ml - mr;
  const ch = H - mt - mb;

  const xOf = (year: number) => ml + (year / 5) * cw;
  const yOf = (val: number) => mt + ch - (val / 100) * ch;

  const pts = DATA.map((d) => ({ x: xOf(d.year), y: yOf(d.value) }));
  const linePath = catmullRomPath(pts);
  const bottomY = mt + ch;
  const lastPt = pts[pts.length - 1];
  const areaPath = `${linePath} L ${lastPt.x} ${bottomY} L ${pts[0].x} ${bottomY} Z`;

  return (
    <div className="mx-auto mb-4 w-full max-w-4xl">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Gráfico de sobrevivência de empresas ao longo de 5 anos"
      >
        <defs>
          <linearGradient id="survivalAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR} stopOpacity="0.38" />
            <stop offset="100%" stopColor={COLOR} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y-axis title */}
        <text x="0" y={mt - 36} fill="#6B7280" fontSize="13">
          % de empresas
        </text>
        <text x="0" y={mt - 20} fill="#6B7280" fontSize="13">
          que continuam
        </text>

        {/* Grid lines + Y-axis labels */}
        {Y_TICKS.map((tick) => {
          const y = yOf(tick);
          return (
            <g key={tick}>
              <line
                x1={ml}
                y1={y}
                x2={ml + cw}
                y2={y}
                stroke="#374151"
                strokeWidth="0.8"
                strokeDasharray="6 5"
              />
              <text
                x={ml - 8}
                y={y + 4}
                textAnchor="end"
                fill="#6B7280"
                fontSize="13"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {/* Y-axis vertical line */}
        <line
          x1={ml}
          y1={mt}
          x2={ml}
          y2={bottomY}
          stroke="#374151"
          strokeWidth="1"
        />

        {/* X-axis horizontal line */}
        <line
          x1={ml}
          y1={bottomY}
          x2={ml + cw}
          y2={bottomY}
          stroke="#374151"
          strokeWidth="1"
        />

        {/* Area fill */}
        <path d={areaPath} fill="url(#survivalAreaGrad)" />

        {/* Smooth line */}
        <path
          d={linePath}
          fill="none"
          stroke={COLOR}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data point circles */}
        {pts.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="5" fill={COLOR} />
        ))}

        {/* "100%" annotation above first point */}

        {/* X-axis labels */}
        {X_LABELS.map((label, i) => (
          <text
            key={i}
            x={xOf(i + 1)}
            y={bottomY + 28}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="13"
          >
            {label}
          </text>
        ))}

        {/* Right annotation */}
        <text
          x={lastPt.x + 18}
          y={lastPt.y - 6}
          fill={COLOR}
          fontSize="15"
          fontWeight="bold"
        >
          Menos de 20%
        </text>
        <text x={lastPt.x + 18} y={lastPt.y + 14} fill="#9CA3AF" fontSize="13">
          chegam até 5 anos
        </text>
      </svg>
    </div>
  );
}
