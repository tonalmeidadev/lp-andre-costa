declare function gtag(...args: unknown[]): void;

type EventName =
  | "scroll_depth"
  | "time_on_page"
  | "rage_click"
  | "page_return"
  | "click_cta"
  | "exit_intent_open"
  | "exit_intent_close"
  | "carousel_slide"
  | "accordion_open"
  | "countdown_expired"
  | "vsl_ready"
  | "vsl_first_play"
  | "vsl_progress"
  | "vsl_pause"
  | "vsl_completed";

type EventParams = {
  button_name?: string;
  location?: string;
  label?: string;
  [key: string]: unknown;
};

export function trackEvent(name: EventName, params?: EventParams) {
  if (typeof gtag === "undefined") return;

  gtag("event", name, {
    ...params,
    transport_type: "beacon",
  });
}
