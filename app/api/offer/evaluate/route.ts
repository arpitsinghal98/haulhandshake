function evaluateLogic({ posted_rate, carrier_offer, last_broker_offer, round }: {
  posted_rate: number;
  carrier_offer: number;
  last_broker_offer?: number | null;
  round: number;
}) {
  const round_num = round;
  const actual_rate = posted_rate;
  const prev_counter = last_broker_offer;

  if (round_num < 1 || round_num > 3) {
    return {
      next_broker_offer: null,
      round: round_num
    };
  }

  let base_offer = actual_rate;
  if (prev_counter !== undefined && prev_counter !== null && prev_counter > actual_rate) {
    base_offer = prev_counter;
  }

  let gap = carrier_offer - base_offer;
  let counter_rate: number;

  if (round_num === 1) {
    counter_rate = base_offer + gap * 0.13;
  } else if (round_num === 2) {
    if (prev_counter === undefined || prev_counter === null) {
      return {
        next_broker_offer: null,
        rounds_used_next: round_num,
        reason: 'Missing previous counter for round 2.'
      };
    }
    counter_rate = base_offer + gap * 0.07;
  } else {
    if (prev_counter === undefined || prev_counter === null) {
      return {
        next_broker_offer: null,
        rounds_used_next: round_num,
        reason: 'Missing previous counter for round 3.'
      };
    }
    counter_rate = base_offer + gap * 0.04;
  }

  counter_rate = Math.round(counter_rate);
  return {
    next_broker_offer: counter_rate,
    round: round_num
  };
}

import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/app/api/_utils/validateApiKey';

interface EvalIn {
  posted_rate: number;
  carrier_offer: number;
  last_broker_offer?: number | null;
  round: number;
}

interface EvalOut {
  next_broker_offer: number | null;
  round: number;
}

const API_KEY = process.env.API_KEY;



export async function GET(req: NextRequest) {
  const unauthorized = validateApiKey(req);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(req.url);
  const posted_rate = Number(searchParams.get('posted_rate'));
  const carrier_offer = Number(searchParams.get('carrier_offer'));
  const last_broker_offer = searchParams.has('last_broker_offer') ? Number(searchParams.get('last_broker_offer')) : undefined;
  const round = Number(searchParams.get('round'));

  if (isNaN(posted_rate) || isNaN(carrier_offer) || isNaN(round)) {
    return NextResponse.json({ detail: 'Missing or invalid parameters' }, { status: 400 });
  }

  const result = evaluateLogic({ posted_rate, carrier_offer, last_broker_offer, round });
  return NextResponse.json(result);
}
