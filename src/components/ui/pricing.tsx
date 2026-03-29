'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BorderGlow from '@/components/ui/BorderGlow';

type FREQUENCY = 'monthly' | 'yearly';
const frequencies: FREQUENCY[] = ['monthly', 'yearly'];

interface Plan {
  name: string;
  info: string;
  icon?: React.ReactNode;
  price: {
    monthly: number;
    yearly: number;
  };
  features: {
    text: string;
    tooltip?: string;
  }[];
  btn: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
  plans: Plan[];
  heading: string;
  description?: string;
  showFrequencyToggle?: boolean;
}

export function PricingSection({
  plans,
  heading,
  description,
  showFrequencyToggle = true,
  ...props
}: PricingSectionProps) {
  const [frequency, setFrequency] = React.useState<'monthly' | 'yearly'>(
    'monthly',
  );

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center space-y-3 p-0',
        props.className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-lg space-y-1.5">
        <h2 className="text-center text-xl font-bold tracking-tight md:text-2xl">
          {heading}
        </h2>
        {description && (
          <p className="text-muted-foreground text-center text-xs md:text-sm">
            {description}
          </p>
        )}
      </div>
      {showFrequencyToggle ? (
        <PricingFrequencyToggle
          frequency={frequency}
          setFrequency={setFrequency}
        />
      ) : null}
      <div className="mx-auto grid w-full max-w-360 grid-cols-1 gap-3 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard plan={plan} key={plan.name} frequency={frequency} />
        ))}
      </div>
    </div>
  );
}

type PricingFrequencyToggleProps = React.ComponentProps<'div'> & {
  frequency: FREQUENCY;
  setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

export function PricingFrequencyToggle({
  frequency,
  setFrequency,
  ...props
}: PricingFrequencyToggleProps) {
  return (
    <div
      className={cn(
        'bg-muted/30 mx-auto flex w-fit rounded-full border p-1',
        props.className,
      )}
      {...props}
    >
      {frequencies.map((freq) => (
        <button
          key={freq}
          type="button"
          onClick={() => setFrequency(freq)}
          className="relative px-4 py-1 text-sm capitalize"
        >
          <span className="relative z-10">{freq}</span>
          {frequency === freq && (
            <motion.span
              layoutId="frequency"
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-foreground absolute inset-0 z-10 rounded-full mix-blend-difference"
            />
          )}
        </button>
      ))}
    </div>
  );
}

type PricingCardProps = React.ComponentProps<'div'> & {
  plan: Plan;
  frequency?: FREQUENCY;
};

export function PricingCard({
  plan,
  className,
  frequency = frequencies[0],
  ...props
}: PricingCardProps) {
  return (
    <BorderGlow
      className={cn('w-full', className)}
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#07080b"
      borderRadius={20}
      glowRadius={28}
      glowIntensity={plan.highlighted ? 1 : 0.8}
      coneSpread={25}
      animated={Boolean(plan.highlighted)}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
      fillOpacity={0.45}
    >
      <div
        key={plan.name}
        className="relative flex min-h-96 w-full flex-col rounded-[20px] border border-white/8 bg-[#07080b] p-4"
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/80">
            {plan.icon}
          </span>
          <p className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-white">
            {plan.name === 'Free' ? 'Free' : `$${plan.price[frequency]}/month`}
          </p>
        </div>

        <h3 className="mt-4 text-[28px] font-medium tracking-[-0.02em] text-white">{plan.name} Plan</h3>
        <p className="mt-1 text-[15px] leading-snug text-white/70">{plan.info}</p>

        <div className="mt-4 rounded-full border border-white/12 bg-white/10 p-2">
          <Button
            className={cn(
              'h-10 w-full rounded-full text-[18px] font-medium',
              plan.highlighted
                ? 'bg-white text-black hover:bg-white/90'
                : 'bg-white/8 text-white hover:bg-white/14',
            )}
            variant="ghost"
            asChild
          >
            <Link href={plan.btn.href}>{plan.btn.text}</Link>
          </Button>
        </div>

        <p className="mt-4 text-[14px] font-semibold uppercase tracking-[0.06em] text-white/70">Features:</p>
        <div className="mt-2 space-y-2 text-[15px] text-white/80">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3.5">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p
                    className={cn(
                      feature.tooltip &&
                        'cursor-pointer border-b border-dashed',
                    )}
                  >
                    {feature.text}
                  </p>
                </TooltipTrigger>
                {feature.tooltip && (
                  <TooltipContent>
                    <p>{feature.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
        </div>
      </div>
    </BorderGlow>
  );
}
