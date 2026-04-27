import Link from "next/link";

/** Matches Figma multi-stop brand gradient on service icons and progress fills. */
const AR_BRAND_GRADIENT =
  "linear-gradient(135deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

const AR_PROGRESS_GRADIENT =
  "linear-gradient(90deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

function IconTrendingUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M23 6l-9.5 9.5-5-5L1 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 6h6v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViewAllMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="62"
      height="20"
      viewBox="0 0 62 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1.76102 4.368L4.72902 12.194L7.58502 4.48H8.90102L5.31702 14H4.09902L0.431016 4.564L1.76102 4.368ZM11.239 14H9.88102V7.21H11.239V14ZM10.539 5.992C10.3057 5.992 10.1097 5.91267 9.95102 5.754C9.79235 5.59533 9.71302 5.39467 9.71302 5.152C9.71302 4.91867 9.79235 4.72267 9.95102 4.564C10.1097 4.396 10.3057 4.312 10.539 4.312C10.7723 4.312 10.973 4.39133 11.141 4.55C11.309 4.70867 11.393 4.90933 11.393 5.152C11.393 5.38533 11.309 5.586 11.141 5.754C10.973 5.91267 10.7723 5.992 10.539 5.992ZM18.7122 10.906H13.8962C13.9335 11.3167 14.0315 11.6853 14.1902 12.012C14.3582 12.3387 14.6055 12.5953 14.9322 12.782C15.2588 12.9593 15.6742 13.048 16.1782 13.048C16.5795 13.048 16.9248 12.992 17.2142 12.88C17.5128 12.768 17.8488 12.6233 18.2222 12.446L18.6422 13.426C18.4182 13.5567 18.1755 13.6827 17.9142 13.804C17.6528 13.916 17.3775 14.0047 17.0882 14.07C16.7988 14.1353 16.4955 14.168 16.1782 14.168C15.3755 14.168 14.6988 14.0187 14.1482 13.72C13.5975 13.4213 13.1822 13.006 12.9022 12.474C12.6315 11.9327 12.4962 11.3073 12.4962 10.598C12.4962 9.88867 12.6268 9.268 12.8882 8.736C13.1495 8.204 13.5228 7.78867 14.0082 7.49C14.4935 7.182 15.0722 7.028 15.7442 7.028C16.4535 7.028 17.0228 7.20067 17.4522 7.546C17.8908 7.89133 18.2082 8.34867 18.4042 8.918C18.6095 9.48733 18.7122 10.1033 18.7122 10.766V10.906ZM13.9242 9.996H17.4102C17.3542 9.62267 17.2562 9.30067 17.1162 9.03C16.9762 8.75933 16.7895 8.54933 16.5562 8.4C16.3322 8.25067 16.0475 8.176 15.7022 8.176C15.3568 8.176 15.0582 8.25067 14.8062 8.4C14.5542 8.54933 14.3535 8.75933 14.2042 9.03C14.0642 9.30067 13.9708 9.62267 13.9242 9.996ZM26.7049 14H25.4729L23.9749 9.17L22.5609 14H21.3289L19.2709 7.448L20.5589 6.972L21.9589 11.998L23.2889 7.21H24.7029L26.1029 11.998L27.4329 7.21H28.8189L26.7049 14ZM34.0495 12.04C34.0495 12.208 34.0915 12.376 34.1755 12.544C34.2595 12.7027 34.3855 12.838 34.5535 12.95C34.7215 13.0527 34.9315 13.104 35.1835 13.104C35.5288 13.104 35.8508 13.02 36.1495 12.852C36.4575 12.684 36.7282 12.4693 36.9615 12.208V10.836H35.3095C34.8988 10.836 34.5862 10.9573 34.3715 11.2C34.1568 11.4427 34.0495 11.7227 34.0495 12.04ZM33.6295 8.694L33.2515 7.63C33.4288 7.50867 33.6622 7.406 33.9515 7.322C34.2408 7.22867 34.5348 7.15867 34.8335 7.112C35.1322 7.056 35.3748 7.028 35.5615 7.028C36.0842 7.028 36.5508 7.13533 36.9615 7.35C37.3815 7.55533 37.7082 7.84 37.9415 8.204C38.1842 8.55867 38.3055 8.95533 38.3055 9.394V14H37.3675L37.1995 13.356C36.9662 13.5613 36.6675 13.748 36.3035 13.916C35.9395 14.084 35.5755 14.168 35.2115 14.168C34.4088 14.168 33.8115 13.9673 33.4195 13.566C33.0368 13.1647 32.8455 12.656 32.8455 12.04C32.8455 11.3587 33.0742 10.8407 33.5315 10.486C33.9982 10.122 34.6002 9.94 35.3375 9.94H36.9475V9.87C36.9475 9.40333 36.8542 9.016 36.6675 8.708C36.4808 8.39067 36.1215 8.232 35.5895 8.232C35.1882 8.232 34.8242 8.28333 34.4975 8.386C34.1708 8.47933 33.8815 8.582 33.6295 8.694ZM41.4158 14H40.0718V4.27L41.4158 4.116V14ZM44.7244 14H43.3804V4.27L44.7244 4.116V14Z"
        fill="#0053A7"
      />
      <path
        d="M54 14L58 10L54 6"
        stroke="#0053A7"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Up-right arrow — same path as login “Enter Demo” CTA (`src/app/page.tsx`). */
function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
      {children}
    </h2>
  );
}

function StatCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
      <p className="text-xs font-normal leading-4 text-[var(--ar-text-muted)]">
        {label}
      </p>
      <p className="text-[32px] font-semibold leading-8 text-[#00162d]">
        {value}
      </p>
      <div
        className="flex items-center gap-1 text-sm font-normal leading-5"
        style={{ color: "var(--ar-color-state-success-bg)" }}
      >
        <IconTrendingUp className="shrink-0" aria-hidden />
        <span>{change}</span>
      </div>
    </div>
  );
}

type ServiceStatusTone = "info" | "inProgress" | "success";

function ServiceIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconFloorPlan() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      aria-hidden
    >
      <g transform="translate(24 24) scale(1.6) translate(-24 -24)">
        <path
          d="M21 14.2354C21.4654 14.2354 21.9245 14.3437 22.3408 14.5518L26.5527 16.6582C26.6886 16.7261 26.8384 16.7612 26.9902 16.7627H27.0088C27.1607 16.7613 27.3103 16.726 27.4463 16.6582L31.1055 14.8281H31.1064C31.4115 14.6757 31.7502 14.6037 32.0908 14.6191C32.4315 14.6347 32.7628 14.7366 33.0527 14.916C33.3427 15.0955 33.5823 15.3465 33.748 15.6445C33.9136 15.9422 34.0002 16.2776 34 16.6182V29.3828C33.9998 29.754 33.8964 30.1179 33.7012 30.4336C33.5058 30.7494 33.2257 31.0039 32.8936 31.1699L32.8945 31.1709L28.3408 33.4473V33.4482C27.9245 33.6562 27.4654 33.7646 27 33.7646C26.5346 33.7646 26.0755 33.6562 25.6592 33.4482V33.4473L21.4473 31.3418C21.3085 31.2724 21.1552 31.2363 21 31.2363C20.8449 31.2363 20.6915 31.2715 20.5527 31.3408L16.8945 33.1719H16.8936C16.5884 33.3243 16.249 33.3965 15.9082 33.3809C15.5675 33.3652 15.2362 33.2627 14.9463 33.083C14.6562 32.9032 14.4166 32.6519 14.251 32.3535C14.0854 32.0551 13.9992 31.7192 14 31.3779V18.6172L14.0049 18.4775C14.0276 18.1549 14.128 17.8416 14.2988 17.5654C14.4941 17.2499 14.7736 16.9951 15.1055 16.8291L19.6592 14.5518L19.8174 14.4785C20.1905 14.3184 20.5928 14.2354 21 14.2354ZM16 18.6172V31.3828L19.6592 29.5527L19.8174 29.4795C19.8775 29.4537 19.9384 29.43 20 29.4082V16.6162L16 18.6172ZM22 29.4082C22.1161 29.4493 22.23 29.4974 22.3408 29.5527L26 31.3818V18.5908C25.884 18.5498 25.7699 18.5026 25.6592 18.4473V18.4463L22 16.6162V29.4082ZM28.3418 18.4463L28.3408 18.4473C28.2301 18.5026 28.1161 18.5498 28 18.5908V31.3818L32 29.3818V16.6162L28.3418 18.4463Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function IconAsBuiltDocs() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      aria-hidden
    >
      <g transform="translate(24 24) scale(1.6) translate(-24 -24)">
        <path
          d="M27 13C27.2652 13 27.5195 13.1054 27.707 13.293L32.707 18.293C32.8946 18.4805 33 18.7348 33 19V32C33 32.7957 32.6837 33.5585 32.1211 34.1211C31.5585 34.6837 30.7957 35 30 35H18C17.2044 35 16.4415 34.6837 15.8789 34.1211C15.3163 33.5585 15 32.7957 15 32V16C15 15.2044 15.3163 14.4415 15.8789 13.8789C16.4415 13.3163 17.2044 13 18 13H27ZM18 15C17.7348 15 17.4805 15.1054 17.293 15.293C17.1054 15.4805 17 15.7348 17 16V32C17 32.2652 17.1054 32.5195 17.293 32.707C17.4805 32.8946 17.7348 33 18 33H30C30.2652 33 30.5195 32.8946 30.707 32.707C30.8946 32.5195 31 32.2652 31 32V21H28C27.2044 21 26.4415 20.6837 25.8789 20.1211C25.3163 19.5585 25 18.7956 25 18V15H18ZM28 28C28.5523 28 29 28.4477 29 29C29 29.5523 28.5523 30 28 30H20C19.4477 30 19 29.5523 19 29C19 28.4477 19.4477 28 20 28H28ZM28 24C28.5523 24 29 24.4477 29 25C29 25.5523 28.5523 26 28 26H20C19.4477 26 19 25.5523 19 25C19 24.4477 19.4477 24 20 24H28ZM22 20C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H20C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20H22ZM27 18C27 18.2652 27.1054 18.5195 27.293 18.707C27.4805 18.8946 27.7348 19 28 19H30.5859L27 15.4141V18Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function IconDrafting() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      aria-hidden
    >
      <g transform="translate(24 24) scale(1.6) translate(-24 -24)">
        <path
          d="M14.666 13.2812C14.9546 13.2002 15.2575 13.1858 15.5518 13.2373L15.6768 13.2627L15.6963 13.2676L28.3398 16.5898H28.3389C28.7022 16.6812 29.033 16.8724 29.293 17.1426C29.5573 17.4175 29.7377 17.7628 29.8125 18.1367L30.9141 23.6445C31.0106 23.6302 31.1083 23.6211 31.207 23.6211C31.7373 23.6211 32.2461 23.8322 32.6211 24.207L34.207 25.793L34.3398 25.9395C34.6314 26.2953 34.793 26.7429 34.793 27.207C34.7929 27.6711 34.6314 28.1188 34.3398 28.4746L34.207 28.6211L28.6211 34.207C28.2461 34.5818 27.7372 34.7929 27.207 34.793C26.7431 34.7929 26.2953 34.6313 25.9395 34.3398L25.793 34.207L24.207 32.6211C23.8322 32.2461 23.6212 31.7372 23.6211 31.207C23.6211 31.1083 23.6302 31.0105 23.6445 30.9141L18.1367 29.8125C17.7629 29.7376 17.4174 29.5572 17.1426 29.293C16.8724 29.0331 16.6812 28.7022 16.5898 28.3389V28.3398L13.2676 15.6963C13.2659 15.69 13.2642 15.6831 13.2627 15.6768C13.1823 15.3439 13.1887 14.9957 13.2812 14.666C13.374 14.3362 13.5507 14.0353 13.793 13.793C14.0353 13.5507 14.3362 13.374 14.666 13.2812ZM25.6211 31.207L27.207 32.793L32.793 27.207L31.207 25.6211L25.6211 31.207ZM21.916 20.502C22.3074 20.3148 22.7443 20.2071 23.207 20.207C24.8639 20.207 26.207 21.5502 26.207 23.207C26.207 24.8638 24.8638 26.207 23.207 26.207C21.5503 26.2069 20.2071 24.8637 20.207 23.207C20.207 22.7443 20.3149 22.3074 20.502 21.916L15.7109 17.125L18.5244 27.832L18.5293 27.8516L24.8779 29.1211L29.1211 24.8779L27.8516 18.5293C27.8452 18.5278 27.8384 18.5261 27.832 18.5244L17.125 15.7109L21.916 20.502ZM23.207 22.207C22.6549 22.2072 22.207 22.6548 22.207 23.207C22.2071 23.7592 22.6549 24.2069 23.207 24.207C23.7593 24.207 24.207 23.7593 24.207 23.207C24.207 22.6547 23.7593 22.207 23.207 22.207Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function IconRealityCapture() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      aria-hidden
    >
      <g transform="translate(24 24) scale(1.6) translate(-24 -24)">
        <path
          d="M24 13.001C24.5249 13.001 25.0401 13.1397 25.4951 13.4014L25.4961 13.4004L32.4961 17.4004L32.5 17.4033C32.9555 17.6664 33.3344 18.0446 33.5977 18.5C33.8608 18.9554 33.9995 19.4721 34 19.998V28C33.9995 28.526 33.8608 29.0427 33.5977 29.498C33.3344 29.9535 32.9556 30.3317 32.5 30.5947L32.4961 30.5977L25.4961 34.5977L25.4951 34.5967C25.0712 34.8404 24.595 34.9756 24.1074 34.9932C24.0721 34.9969 24.0363 34.999 24 34.999C23.9634 34.999 23.9272 34.997 23.8916 34.9932C23.4041 34.9755 22.9277 34.8405 22.5039 34.5967V34.5977L15.5039 30.5977L15.5 30.5947C15.0444 30.3317 14.6656 29.9535 14.4023 29.498C14.1392 29.0427 14.0005 28.526 14 28V19.998L14.0068 19.8008C14.0374 19.3435 14.1722 18.8983 14.4023 18.5C14.6656 18.0446 15.0445 17.6664 15.5 17.4033L15.5039 17.4004L22.5039 13.4004V13.4014C22.9591 13.1394 23.4748 13.001 24 13.001ZM16 27.998L16.0088 28.1289C16.026 28.2582 16.0682 28.3834 16.1338 28.4971C16.2208 28.6475 16.346 28.7728 16.4961 28.8604L23 32.5762V24.5771L16 20.5547V27.998ZM25 24.5771V32.5762L31.5039 28.8604C31.654 28.7728 31.7792 28.6475 31.8662 28.4971C31.9536 28.3457 31.9996 28.1739 32 27.999V20.5547L25 24.5771ZM24 15.001C23.8245 15.001 23.652 15.047 23.5 15.1348L23.4961 15.1367L17.0215 18.835L23.999 22.8447L30.9766 18.835L24.5039 15.1367L24.5 15.1348C24.348 15.047 24.1755 15.001 24 15.001Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function ServiceCard({
  title,
  description,
  status,
  action,
  statusTone,
  icon,
  actionHref,
  demoHighlight = false,
}: {
  title: string;
  description: string;
  status: string;
  action: string;
  statusTone: ServiceStatusTone;
  icon: React.ReactNode;
  /** When set, the CTA renders as a link (e.g. match sidebar Projects destination). */
  actionHref?: string;
  /** Pink outline + \"Featured Demo\" preheader coach marker. */
  demoHighlight?: boolean;
}) {
  const statusClass =
    statusTone === "info"
      ? "text-[#0053a7]"
      : statusTone === "inProgress"
        ? "text-[#cd0074]"
        : "text-[#1fad75]";

  const ctaClassName =
    "relative flex h-12 w-full items-center justify-center gap-1.5 rounded-full border border-white/50 bg-[#003c79] px-8 text-base font-medium text-[#fafdff] transition hover:bg-[var(--ar-color-primary-700)]";

  const ctaInner = (
    <>
      <span>{action}</span>
      <IconArrowUpRight className="shrink-0 text-[#fafdff]" />
    </>
  );

  return (
    <div
      className={[
        "flex min-h-[317px] min-w-0 flex-1 flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm",
        demoHighlight ? "border-[#f4038b]" : "border-[#e5e5e5]",
      ].join(" ")}
    >
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-[10px] px-3"
        style={{ backgroundImage: AR_BRAND_GRADIENT }}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold leading-[22px] text-[#00162d]">
        {title}
      </h3>
      <p className="min-h-[52px] flex-1 text-sm leading-5 text-[var(--ar-text-muted)]">
        {description}
      </p>

      <div className="flex flex-col gap-2 border-t border-[#e5e5e5] pt-4">
        {demoHighlight ? (
          <div className="flex flex-col items-start gap-2">
            <span className="rounded-full border border-[#cd0074] bg-[#ffebf6] px-3 py-1 text-sm font-medium leading-5 text-[#2f001a]">
              Featured Demo
            </span>
            <p className={`text-sm font-medium leading-5 ${statusClass}`}>
              {status}
            </p>
          </div>
        ) : (
          <p className={`text-sm font-medium leading-5 ${statusClass}`}>
            {status}
          </p>
        )}
        {actionHref ? (
          <Link
            href={actionHref}
            className={`${ctaClassName} !text-[#fafdff] hover:!text-[#fafdff] [&_svg]:!text-[#fafdff]`}
          >
            {ctaInner}
          </Link>
        ) : (
          <button type="button" className={ctaClassName}>
            {ctaInner}
          </button>
        )}
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  project,
  time,
  icon,
  href,
}: {
  title: string;
  project: string;
  time: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const className = [
    "flex gap-3 rounded-xl bg-[#f5f5f5] p-3",
    href ? "cursor-pointer transition hover:bg-[#efeff1]" : "",
  ].join(" ");

  const content = (
    <>
      <div className="shrink-0">{icon}</div>
      <div className="min-w-0 space-y-0.5">
        <p className="text-sm font-medium leading-5 text-[#00162d]">{title}</p>
        <p className="text-xs font-normal leading-4 text-[var(--ar-text-muted)]">
          {project}
        </p>
        <p className="text-xs font-normal leading-4 text-[#999]">{time}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

type ProjectStatusVariant = "active" | "inProgress" | "completed";

function RecentProjectCard({
  name,
  location,
  tags,
  status,
  progress,
  variant,
  href,
}: {
  name: string;
  location: string;
  tags: string[];
  status: string;
  progress: number;
  variant: ProjectStatusVariant;
  href?: string;
}) {
  const pillClass =
    variant === "active"
      ? "border-[#0053a7] bg-[#eff7ff] text-[#002952]"
      : variant === "inProgress"
        ? "border-[#cd0074] bg-[#ffebf6] text-[#2f001a]"
        : "border-[#1fad75] bg-[#e8f7f1] text-[#13795b]";

  const className = [
    "flex flex-col gap-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm",
    href ? "cursor-pointer transition hover:shadow-md" : "",
  ].join(" ");

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-[22px] text-[#00162d]">
            {name}
          </h3>
          <p className="mt-1 text-sm leading-5 text-[var(--ar-text-muted)]">
            {location}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium leading-5 ${pillClass}`}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#f3f3f5] px-3 py-1 text-xs leading-4 text-[#00162d]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs leading-4 text-[var(--ar-text-muted)]">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f3f5]">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${progress}%`,
              backgroundImage: AR_PROGRESS_GRADIENT,
            }}
          />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

function QuickAction({
  label,
  icon,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const className =
    "flex h-[130px] min-w-0 flex-1 flex-col items-center justify-start gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-6 text-sm font-medium text-[#00162d] shadow-sm transition hover:bg-[#f8fafc]";

  if (href) {
    return (
      <Link href={href} className={className}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f3f5] text-[#00162d]">
          {icon}
        </div>
        <span className="text-center text-sm font-medium leading-5">{label}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f3f5] text-[#00162d]">
        {icon}
      </div>
      <span className="text-center text-sm font-medium leading-5">{label}</span>
    </button>
  );
}

export function DashboardHomeContent() {
  return (
      <section className="flex flex-col gap-8 font-[family-name:var(--ar-font-family-body)]">
        <div className="-mx-8 w-[calc(100%+64px)] border-b border-[#e5e5e5] bg-white px-8 py-8">
          <div className="flex flex-col items-center gap-0 text-center">
            <h1 className="mb-0 font-[family-name:var(--ar-font-family-heading)] text-4xl font-medium leading-10 tracking-normal text-[#00162d]">
              WELCOME BACK, JOHN!
            </h1>
            <p className="mt-0 text-base font-medium leading-5 text-[#6f6f6f]">
              You have 3 active projects and 2 pending deliverables
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <StatCard label="Active Projects" value="3" change="+2 this week" />
          <StatCard
            label="Floor Plans Delivered"
            value="24"
            change="+5 this month"
          />
          <StatCard
            label="As-Built Packages"
            value="12"
            change="+3 this month"
          />
          <StatCard label="Drafting Sets" value="8" change="+1 this week" />
          <StatCard
            label="3D Scans Available"
            value="12"
            change="+2 recently processed"
          />
        </div>

        <div className="flex flex-col gap-4">
          <SectionHeading>Your Services</SectionHeading>

          <div className="flex flex-col gap-4 xl:flex-row">
            <ServiceCard
              title="Real Estate Floor Plans"
              description="Professional 2D floor plans for listings and marketing"
              status="Active: 2"
              action="View Plans"
              statusTone="info"
              icon={<IconFloorPlan />}
              actionHref="/projects"
            />
            <ServiceCard
              title="As-Built Documents"
              description="Accurate as-built drawings and documentation"
              status="In Progress: 1"
              action="View Documents"
              statusTone="inProgress"
              icon={<IconAsBuiltDocs />}
              actionHref="/projects"
            />
            <ServiceCard
              title="Drafting & Design"
              description="Complete architectural drafting and design sets"
              status="Ready for Download: 1"
              action="View Drawings"
              statusTone="success"
              icon={<IconDrafting />}
              actionHref="/projects/casa-mirador"
              demoHighlight
            />
            <ServiceCard
              title="3D Reality Capture"
              description="Laser scanning and point cloud services"
              status="Scans Ready: 2"
              action="View Scans"
              statusTone="success"
              icon={<IconRealityCapture />}
              actionHref="/projects"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <SectionHeading>Recent Projects</SectionHeading>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0053a7] hover:opacity-90"
                aria-label="View all projects"
              >
                <ViewAllMark className="shrink-0" />
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <RecentProjectCard
                name="Williams Avenue Residence"
                location="Los Angeles, CA"
                tags={["Floor Plans", "As-Built"]}
                status="Active"
                progress={65}
                variant="active"
              />
              <RecentProjectCard
                name="Estrella Avenue House"
                location="San Diego, CA"
                tags={["3D Scan", "Drafting"]}
                status="Active"
                progress={40}
                variant="active"
              />
              <RecentProjectCard
                name="Casa Mirador"
                location="Chakabamba, Peru"
                tags={["Floor Plans", "Design"]}
                status="Completed"
                progress={100}
                variant="completed"
                href="/projects/casa-mirador"
              />
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-4 lg:w-[286px]">
            <SectionHeading>Recent Activity</SectionHeading>
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4">
                <ActivityItem
                  title="Floor plan uploaded"
                  project="Williams Avenue"
                  time="2 hours ago"
                  icon={
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <rect width="32" height="32" rx="8" fill="#D6D6D6" />
                      <path
                        d="M14 9.32324C14.0323 9.32324 14.0643 9.32454 14.0957 9.32812C14.3989 9.34155 14.6966 9.41578 14.9688 9.55176L17.7764 10.9551C17.8458 10.9898 17.9224 11.0078 18 11.0078C18.0776 11.0078 18.1542 10.9898 18.2236 10.9551L20.6631 9.73535C20.8918 9.6211 21.1459 9.5675 21.4014 9.5791C21.5929 9.58783 21.7806 9.63302 21.9541 9.71191L22.123 9.80176L22.2783 9.91309C22.377 9.99323 22.4656 10.0851 22.541 10.1875L22.6445 10.3486L22.7266 10.5205C22.7972 10.6973 22.8331 10.8866 22.833 11.0781V19.5879L22.8184 19.7949C22.7896 20.0003 22.7192 20.1983 22.6094 20.376C22.4995 20.5536 22.3536 20.7058 22.1826 20.8232L22.0039 20.9287L18.9688 22.4473C18.6934 22.5848 18.3919 22.6579 18.085 22.6699C18.0827 22.6702 18.0804 22.6707 18.0781 22.6709C18.0521 22.6718 18.0261 22.6758 18 22.6758C17.9716 22.6758 17.9434 22.672 17.915 22.6709L17.9141 22.6699C17.6075 22.6577 17.3063 22.5847 17.0312 22.4473L14.2236 21.043C14.1542 21.0083 14.0776 20.9902 14 20.9902C13.9611 20.9902 13.9224 20.995 13.8848 21.0039L13.7764 21.043L11.3379 22.2627H11.3369C11.108 22.3771 10.8533 22.4316 10.5977 22.4199C10.3421 22.4082 10.0934 22.3311 9.87598 22.1963C9.65861 22.0615 9.47965 21.873 9.35547 21.6494C9.23133 21.4258 9.16644 21.1738 9.16699 20.918V12.4102C9.16719 12.1318 9.24422 11.8588 9.39062 11.6221L9.5127 11.4531C9.64506 11.2937 9.80939 11.1626 9.99609 11.0693L13.0312 9.55176C13.3031 9.41593 13.6004 9.34167 13.9033 9.32812C13.935 9.32447 13.9673 9.32324 14 9.32324ZM10.833 12.5137V20.6514L13.0312 19.5518L13.167 19.4932V11.3467L10.833 12.5137ZM18.9688 12.4463C18.9247 12.4683 18.8783 12.485 18.833 12.5039V20.6514L21.167 19.4844V11.3467L18.9688 12.4463ZM14.833 19.4932C14.8785 19.5121 14.9246 19.5297 14.9688 19.5518L17.167 20.6504V12.5039L17.0312 12.4463L14.833 11.3467V19.4932Z"
                        fill="#003C79"
                      />
                    </svg>
                  }
                />
                <ActivityItem
                  title="3D scan processed"
                  project="Estrella Avenue"
                  time="5 hours ago"
                  icon={
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <rect width="32" height="32" rx="8" fill="#D6D6D6" />
                      <path
                        d="M16 8.50098C16.379 8.50098 16.7506 8.60121 17.0791 8.79004L17.0801 8.78906L21.7471 11.4561L21.75 11.458C22.079 11.648 22.3529 11.9211 22.543 12.25C22.733 12.5788 22.8326 12.9522 22.833 13.332V18.667C22.8326 19.0468 22.733 19.4201 22.543 19.749C22.3528 20.078 22.079 20.351 21.75 20.541L21.7471 20.543L17.0801 23.21L17.0791 23.209C16.7753 23.3836 16.4343 23.4813 16.085 23.4951C16.057 23.4979 16.0287 23.499 16 23.499C15.9713 23.499 15.943 23.4979 15.915 23.4951C15.5654 23.4813 15.224 23.3839 14.9199 23.209V23.21L10.2529 20.543L10.25 20.541C9.92095 20.351 9.64718 20.078 9.45703 19.749C9.26695 19.4201 9.16741 19.0468 9.16699 18.667V13.332C9.16738 12.9522 9.26705 12.5788 9.45703 12.25C9.64714 11.9211 9.92103 11.648 10.25 11.458L10.2529 11.4561L14.9199 8.78906V8.79004C15.2486 8.60093 15.6208 8.50098 16 8.50098ZM10.833 18.665C10.8331 18.7527 10.8565 18.8391 10.9004 18.915C10.9436 18.9898 11.0056 19.052 11.0801 19.0957L15.167 21.4307V16.4805L10.833 13.9902V18.665ZM16.833 16.4814V21.4307L20.9199 19.0957C20.9944 19.052 21.0564 18.9898 21.0996 18.915C21.1433 18.8394 21.1667 18.7534 21.167 18.666V13.9912L16.833 16.4814ZM16 10.167C15.9122 10.167 15.826 10.1905 15.75 10.2344L15.7471 10.2363L11.6826 12.5566L16 15.0371L20.3154 12.5566L16.2529 10.2363L16.25 10.2344C16.174 10.1905 16.0878 10.167 16 10.167Z"
                        fill="#003C79"
                      />
                    </svg>
                  }
                />
                <ActivityItem
                  title="As-built package ready"
                  project="Casa Mirador"
                  time="1 day ago"
                  href="/projects/casa-mirador?tab=drafting-design"
                  icon={
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <rect width="32" height="32" rx="8" fill="#D6D6D6" />
                      <path
                        d="M18 8.5C18.221 8.5 18.4336 8.58786 18.5898 8.74414L21.9229 12.0771C22.0791 12.2334 22.1669 12.4451 22.167 12.666V21.333C22.167 21.9076 21.9386 22.4589 21.5322 22.8652C21.1259 23.2715 20.5746 23.5 20 23.5H12C11.4255 23.4999 10.874 23.2715 10.4678 22.8652C10.0615 22.4589 9.83398 21.9076 9.83398 21.333V10.666C9.83407 10.0915 10.0615 9.54004 10.4678 9.13379C10.874 8.72754 11.4255 8.50009 12 8.5H18ZM12 10.166C11.8675 10.1661 11.7402 10.2188 11.6465 10.3125C11.5528 10.4062 11.5001 10.5335 11.5 10.666V21.333C11.5 21.4655 11.5528 21.5928 11.6465 21.6865C11.7402 21.7802 11.8675 21.8329 12 21.833H20C20.1325 21.833 20.2598 21.7802 20.3535 21.6865C20.4473 21.5928 20.5 21.4656 20.5 21.333V14.166H18.666C18.0915 14.1659 17.54 13.9385 17.1338 13.5322C16.7275 13.126 16.5001 12.5745 16.5 12V10.166H12ZM18.666 18.5C19.1263 18.5 19.5 18.8728 19.5 19.333C19.5 19.7932 19.1263 20.166 18.666 20.166H13.333C12.8728 20.166 12.5 19.7932 12.5 19.333C12.5 18.8728 12.8728 18.5 13.333 18.5H18.666ZM18.666 15.834C19.1263 15.834 19.5 16.2068 19.5 16.667C19.5 17.1272 19.1263 17.5 18.666 17.5H13.333C12.8728 17.5 12.5 17.1272 12.5 16.667C12.5 16.2068 12.8728 15.834 13.333 15.834H18.666ZM14.666 13.167C15.1263 13.167 15.5 13.5398 15.5 14C15.5 14.4602 15.1263 14.833 14.666 14.833H13.333C12.8728 14.833 12.5 14.4602 12.5 14C12.5 13.5398 12.8728 13.167 13.333 13.167H14.666ZM18.166 12C18.1661 12.1325 18.2188 12.2598 18.3125 12.3535C18.4062 12.4472 18.5335 12.4999 18.666 12.5H19.9893L18.166 10.6768V12Z"
                        fill="#003C79"
                      />
                    </svg>
                  }
                />
                <ActivityItem
                  title="Drafting set in review"
                  project="Williams Avenue"
                  time="2 days ago"
                  icon={
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <rect width="32" height="32" rx="8" fill="#D6D6D6" />
                      <g clipPath="url(#clip0_2189_6594)">
                        <path
                          d="M10.3008 8.64648L10.4902 8.67969L10.5059 8.68359L18.918 10.8936C19.1612 10.9523 19.3863 11.0715 19.5713 11.2383L19.6484 11.3125L19.7197 11.3926C19.8563 11.5567 19.956 11.7483 20.0127 11.9541L20.0381 12.0576L20.7422 15.583C20.763 15.5821 20.7838 15.5811 20.8047 15.5811L20.9531 15.5879C21.2471 15.6171 21.5263 15.7328 21.7549 15.9199L21.8652 16.0195L22.9229 17.0771C23.2039 17.3583 23.3612 17.7401 23.3613 18.1377C23.3613 18.5353 23.2039 18.917 22.9229 19.1982L19.1982 22.9229C18.917 23.2039 18.5353 23.3613 18.1377 23.3613C17.7401 23.3612 17.3584 23.204 17.0771 22.9229L16.0195 21.8652C15.7737 21.6192 15.622 21.2962 15.5879 20.9531L15.5811 20.8047L15.583 20.7422L12.0576 20.0381C11.7773 19.9819 11.5186 19.8466 11.3125 19.6484C11.1064 19.4502 10.9606 19.197 10.8936 18.9189V18.918L8.68359 10.5059C8.68226 10.5008 8.68092 10.4953 8.67969 10.4902C8.61935 10.2405 8.62382 9.9788 8.69336 9.73145L8.75684 9.5498C8.83183 9.37365 8.94093 9.21336 9.07715 9.07715C9.25889 8.89542 9.48403 8.76294 9.73145 8.69336L9.91895 8.65332C10.0453 8.63472 10.1738 8.63258 10.3008 8.64648ZM17.3164 20.8047L18.1377 21.626L21.626 18.1377L20.8047 17.3164L17.3164 20.8047ZM14.6465 13.4688C14.9007 13.364 15.1787 13.3047 15.4707 13.3047C16.6671 13.3047 17.6374 14.2743 17.6377 15.4707C17.6377 16.6673 16.6673 17.6377 15.4707 17.6377C14.2743 17.6374 13.3047 16.6672 13.3047 15.4707C13.3048 15.1787 13.364 14.9007 13.4688 14.6465L10.7891 11.9668L12.4863 18.4229L16.5303 19.2324L19.2324 16.5303L18.4229 12.4863L11.9668 10.7891L14.6465 13.4688ZM15.4707 14.9707C15.195 14.971 14.971 15.195 14.9707 15.4707C14.9707 15.7467 15.1948 15.9704 15.4707 15.9707C15.7468 15.9707 15.9707 15.7468 15.9707 15.4707C15.9704 15.1948 15.7467 14.9707 15.4707 14.9707Z"
                          fill="#003C79"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2189_6594">
                          <rect width="14.7238" height="14.7239" fill="white" transform="translate(8.6377 8.6377)" />
                        </clipPath>
                      </defs>
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <SectionHeading>Quick Actions</SectionHeading>

          <div className="flex flex-col gap-4 sm:flex-row">
            <QuickAction
              label="Request Floor Plans"
              href="/request-service?service=floor-plans"
              icon={
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5229 0 48 4.47715 48 10V38C48 43.5229 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                    fill="#F3F3F5"
                  />
                  <path
                    d="M21.5 15.8633C21.8879 15.8633 22.2702 15.9536 22.6172 16.127H22.6182L26.1279 17.8818C26.2435 17.9395 26.3709 17.9697 26.5 17.9697C26.6291 17.9697 26.7565 17.9395 26.8721 17.8818L29.9219 16.3564C30.176 16.2295 30.4584 16.1697 30.7422 16.1826C31.0261 16.1955 31.3023 16.281 31.5439 16.4307C31.7855 16.5802 31.9849 16.7889 32.123 17.0371C32.261 17.2852 32.3332 17.5648 32.333 17.8486V28.4863C32.3328 28.7955 32.2466 29.0984 32.084 29.3613C31.9213 29.6243 31.6887 29.8373 31.4121 29.9756L27.6182 31.873H27.6172C27.2702 32.0464 26.8879 32.1367 26.5 32.1367C26.1121 32.1367 25.7298 32.0464 25.3828 31.873L21.8721 30.1182C21.7565 30.0605 21.6291 30.0303 21.5 30.0303C21.3709 30.0303 21.2435 30.0605 21.1279 30.1182L18.0781 31.6436C17.8238 31.7706 17.5409 31.8304 17.2568 31.8174C16.9728 31.8043 16.6967 31.7191 16.4551 31.5693C16.2133 31.4195 16.014 31.2096 15.876 30.9609C15.7381 30.7124 15.6663 30.4327 15.667 30.1484V19.5137C15.6672 19.2045 15.7534 18.9016 15.916 18.6387C16.0787 18.3757 16.3113 18.1627 16.5879 18.0244L20.3818 16.127H20.3828C20.7298 15.9536 21.1121 15.8633 21.5 15.8633ZM17.334 19.5146H17.333V30.1523L20.3818 28.6279H20.3828C20.4752 28.5818 20.5702 28.542 20.667 28.5078V17.8477L17.334 19.5146ZM22.333 28.5078C22.4298 28.5421 22.5248 28.5818 22.6172 28.6279H22.6182L25.667 30.1523V19.4912C25.5703 19.457 25.4751 19.4182 25.3828 19.3721L22.333 17.8467V28.5078ZM27.6182 19.3721H27.6172C27.5249 19.4182 27.4297 19.457 27.333 19.4912V30.1514L30.666 28.4854H30.667V17.8477L27.6182 19.3721Z"
                    fill="#00162D"
                  />
                </svg>
              }
            />
            <QuickAction
              label="Request As-Built"
              href="/request-service?service=as-built"
              icon={
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5229 0 48 4.47715 48 10V38C48 43.5229 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                    fill="#F3F3F5"
                  />
                  <path
                    d="M26.582 14.8369C26.7728 14.8559 26.9521 14.9404 27.0889 15.0771L31.2559 19.2432C31.4121 19.3994 31.5 19.612 31.5 19.833V30.666C31.5 31.329 31.2363 31.9648 30.7676 32.4336C30.2988 32.9024 29.6629 33.1659 29 33.166H19C18.337 33.166 17.7003 32.9024 17.2314 32.4336C16.7628 31.9648 16.5 31.3289 16.5 30.666V17.333C16.5 16.67 16.7626 16.0333 17.2314 15.5645C17.7003 15.0956 18.337 14.833 19 14.833H26.5L26.582 14.8369ZM19 16.499C18.779 16.499 18.5664 16.5869 18.4102 16.7432C18.2539 16.8994 18.166 17.112 18.166 17.333V30.666C18.166 30.8869 18.2541 31.0986 18.4102 31.2549C18.5664 31.4112 18.779 31.499 19 31.499H29C29.2209 31.4989 29.4327 31.4111 29.5889 31.2549C29.745 31.0986 29.833 30.887 29.833 30.666V21.499H27.334C26.6709 21.499 26.0343 21.2364 25.5654 20.7676C25.0966 20.2987 24.834 19.6621 24.834 18.999V16.499H19ZM27.334 27.333C27.7941 27.3332 28.167 27.7059 28.167 28.166C28.167 28.6261 27.7941 28.9988 27.334 28.999H20.667C20.2068 28.999 19.834 28.6263 19.834 28.166C19.834 27.7058 20.2068 27.333 20.667 27.333H27.334ZM27.334 23.999C27.7941 23.9992 28.167 24.3719 28.167 24.832C28.167 25.2922 27.7941 25.6649 27.334 25.665H20.667C20.2068 25.665 19.834 25.2923 19.834 24.832C19.834 24.3718 20.2068 23.999 20.667 23.999H27.334ZM22.334 20.666C22.7941 20.6662 23.167 21.0389 23.167 21.499C23.167 21.9592 22.7941 22.3319 22.334 22.332H20.667C20.2068 22.332 19.834 21.9593 19.834 21.499C19.834 21.0388 20.2068 20.666 20.667 20.666H22.334ZM26.5 18.999C26.5 19.22 26.5879 19.4326 26.7441 19.5889C26.9004 19.7451 27.113 19.833 27.334 19.833H29.4883L26.5 16.8447V18.999Z"
                    fill="#00162D"
                  />
                </svg>
              }
            />
            <QuickAction
              label="Request Drafting & Design"
              href="/request-service?service=drafting"
              icon={
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5229 0 48 4.47715 48 10V38C48 43.5229 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                    fill="#F3F3F5"
                  />
                  <path
                    d="M16.8545 15.0156L17.0645 15.0518L17.0811 15.0566L27.6172 17.8242H27.6162C27.9192 17.9004 28.1955 18.0598 28.4121 18.2852C28.6322 18.5142 28.7823 18.8018 28.8447 19.1133L29.7617 23.7031C29.8421 23.6913 29.9237 23.6836 30.0059 23.6836C30.4475 23.6837 30.8712 23.8588 31.1836 24.1709H31.1846L32.5059 25.4932L32.6162 25.6152C32.8592 25.9118 32.9941 26.2852 32.9941 26.6719C32.994 27.0584 32.859 27.4311 32.6162 27.7275L32.5059 27.8496L27.8506 32.5049C27.5382 32.8171 27.1145 32.993 26.6729 32.9932C26.2861 32.9932 25.9128 32.8582 25.6162 32.6152L25.4941 32.5049L24.1719 31.1836V31.1826C23.8597 30.8701 23.6846 30.4466 23.6846 30.0049C23.6846 29.9226 23.6922 29.8412 23.7041 29.7607L19.1143 28.8438C18.8027 28.7814 18.5152 28.6313 18.2861 28.4111C18.0607 28.1944 17.9013 27.9183 17.8252 27.6152V27.6162L15.0576 17.0801C15.0562 17.0748 15.054 17.0687 15.0527 17.0635C14.9858 16.7861 14.9911 16.4955 15.0684 16.2207C15.1457 15.946 15.2933 15.696 15.4951 15.4941C15.697 15.2924 15.9469 15.1447 16.2217 15.0674C16.4277 15.0095 16.643 14.9925 16.8545 15.0156ZM29.7803 25.5742C29.7689 25.5863 29.7572 25.5979 29.7451 25.6094L25.6055 29.75C25.5976 29.7581 25.5892 29.7656 25.5811 29.7734L25.3506 30.0049L26.6719 31.3252L31.3262 26.6709L30.0059 25.3496L29.7803 25.5742ZM22.2637 21.084C22.5897 20.9281 22.9543 20.8389 23.3398 20.8389C24.7202 20.8392 25.8397 21.9585 25.8398 23.3389C25.8397 24.7192 24.7202 25.8385 23.3398 25.8389C21.9592 25.8389 20.84 24.7194 20.8398 23.3389C20.8399 22.9532 20.929 22.5889 21.085 22.2627L17.0918 18.2695L19.4375 27.1934L19.4414 27.209L24.7305 28.2666L28.2676 24.7295L27.21 19.4404C27.2048 19.4392 27.1995 19.4379 27.1943 19.4365L18.2705 17.0908L22.2637 21.084ZM23.3398 22.5049C23.1123 22.5049 22.9054 22.5962 22.7549 22.7441C22.7533 22.7458 22.7526 22.7484 22.751 22.75C22.7493 22.7517 22.7468 22.7532 22.7451 22.7549C22.5972 22.9054 22.5059 23.1114 22.5059 23.3389C22.506 23.799 22.8797 24.1719 23.3398 24.1719C23.7997 24.1715 24.1727 23.7987 24.1729 23.3389C24.1727 22.8789 23.7997 22.5052 23.3398 22.5049Z"
                    fill="#00162D"
                  />
                </svg>
              }
            />
            <QuickAction
              label="Request 3D Reality Capture"
              href="/request-service?service=reality-capture"
              icon={
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5229 0 48 4.47715 48 10V38C48 43.5229 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                    fill="#F3F3F5"
                  />
                  <path
                    d="M24 14.834C24.4376 14.834 24.8668 14.9497 25.2461 15.168L25.2471 15.167L31.0801 18.5L31.083 18.502C31.4627 18.7212 31.7786 19.0365 31.998 19.416C32.2173 19.7954 32.3325 20.2259 32.333 20.6641V27.333C32.3325 27.7712 32.2173 28.2016 31.998 28.5811C31.7786 28.9606 31.4627 29.2759 31.083 29.4951L31.0801 29.4971L25.249 32.8281L25.25 32.8291C24.898 33.0323 24.5019 33.1446 24.0967 33.1602C24.065 33.1638 24.0327 33.166 24 33.166C23.967 33.166 23.9344 33.1639 23.9023 33.1602C23.4975 33.1444 23.1018 33.0321 22.75 32.8291V32.8281L16.9199 29.4971L16.917 29.4951C16.5373 29.2759 16.2214 28.9606 16.002 28.5811C15.7827 28.2016 15.6675 27.7712 15.667 27.333V20.6641C15.6675 20.2259 15.7827 19.7954 16.002 19.416C16.2214 19.0365 16.5373 18.7212 16.917 18.502L16.9199 18.5L22.7529 15.167V15.168C23.1324 14.9495 23.5621 14.834 24 14.834ZM17.333 27.3311C17.3332 27.4772 17.3722 27.6206 17.4453 27.7471C17.5178 27.8726 17.6219 27.9768 17.7471 28.0498L23.167 31.1475V24.4805L17.333 21.1279V27.3311ZM24.833 24.4805V31.1475L30.2529 28.0498C30.3781 27.9768 30.4822 27.8726 30.5547 27.7471C30.6276 27.6208 30.6667 27.4778 30.667 27.332V21.1279L24.833 24.4805ZM24 16.5C23.8537 16.5 23.7097 16.5392 23.583 16.6123L23.5801 16.6143L18.1855 19.6953L24 23.0371L29.8135 19.6953L24.4199 16.6143L24.417 16.6123C24.2903 16.5392 24.1463 16.5 24 16.5Z"
                    fill="#00162D"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>
  );
}
