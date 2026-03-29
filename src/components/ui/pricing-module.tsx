"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import BorderGlow from "@/components/ui/BorderGlow";
import StarBorder from "@/components/ui/StarBorder";

export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  priceMonthly: number;
  priceYearly: number;
  users: string;
  features: PlanFeature[];
  recommended?: boolean;
}

export interface PricingModuleProps {
  title?: string;
  subtitle?: string;
  annualBillingLabel?: string;
  buttonLabel?: string;
  plans: PricingPlan[];
  defaultAnnual?: boolean;
  className?: string;
}

export function PricingModule({
  title = "Pricing Plans",
  subtitle = "Choose a plan that fits your needs.",
  annualBillingLabel = "Annual billing",
  buttonLabel = "Get started",
  plans,
  defaultAnnual = false,
  className,
}: PricingModuleProps) {
  const [isAnnual, setIsAnnual] = React.useState(defaultAnnual);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden px-4 py-10 text-white md:px-8 md:py-12",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
        <p className="mb-6 text-sm text-white/65 md:mb-8 md:text-base">{subtitle}</p>

        <div className="mb-8 flex items-center justify-center gap-2 md:mb-10">
          <button
            id="billing-toggle"
            type="button"
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual((prev) => !prev)}
            className={cn(
              "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isAnnual ? "bg-white" : "bg-white/20",
            )}
          >
            <span
              className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                isAnnual ? "translate-x-5" : "translate-x-0",
              )}
            />
          </button>
          <label
            htmlFor="billing-toggle"
            className="cursor-pointer text-sm text-white/70"
          >
            {annualBillingLabel}
          </label>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">

              <BorderGlow
                className={cn("w-full", plan.recommended && "scale-[1.03]")}
                edgeSensitivity={22}
                backgroundColor="#000000"
                borderRadius={18}
                glowRadius={52}
                glowIntensity={plan.recommended ? 1.2 : 1.05}
                coneSpread={30}
                animated
                glowColor="0 0 100"
                colors={['#ffffff', '#f3f4f6', '#a1a1aa']}
                fillOpacity={0.62}
              >

              <div
                className={cn(
                  "relative rounded-2xl bg-black text-white shadow-[0_18px_44px_rgba(0,0,0,0.6)] transition-all",
                )}
              >
                {plan.recommended && (
                  <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2">
                    <StarBorder
                      as="div"
                      className="rounded-full"
                      color="white"
                      speed="5s"
                      thickness={1}
                    >
                      <span className="inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold text-white">
                        Recommended
                      </span>
                    </StarBorder>
                  </div>
                )}

                <div className={cn("flex flex-col space-y-1.5 p-6 pt-8 text-center", plan.recommended && "pt-14")}>
                  <div className="mb-4 flex justify-center">{plan.icon}</div>
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">{plan.name}</h3>
                  <p className="text-sm text-white/65">{plan.description}</p>
                </div>

                <div className="p-6 pt-0 text-center">
                  <div className="mb-2 text-3xl font-bold transition-all duration-300">
                    ${isAnnual ? plan.priceYearly : plan.priceMonthly}
                  </div>
                  <p className="mb-4 text-sm text-white/60">
                    / {isAnnual ? "year" : "month"}
                  </p>

                  <button
                    type="button"
                    className={cn(
                      "mb-6 w-full rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
                      plan.recommended
                        ? "border-white bg-white text-black hover:bg-white/90"
                        : "border-white/20 bg-white/10 text-white hover:bg-white/18",
                    )}
                  >
                    {buttonLabel}
                  </button>

                  <div className="text-left text-sm">
                    <h4 className="mb-2 font-semibold">Overview</h4>
                    <p className="mb-4 text-white/70">{plan.users}</p>

                    <h4 className="mb-2 font-semibold">Highlights</h4>
                    <ul className="space-y-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          {f.included ? (
                              <Check className="h-4 w-4 text-white" />
                          ) : (
                            <X className="h-4 w-4 text-white/40" />
                          )}
                          <span
                            className={
                              f.included
                                ? "text-white/80"
                                : "text-white/35 line-through"
                            }
                          >
                            {f.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
