import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateRangeFromYearBegnning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateRangeFromYearBegnning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = Array<{
    id: string,
    date: string,
    amount: number,
    completed: number
}>

function SummaryTable () {
    const [summaries, setSummaries] = useState<Summary>([]);
    
    useEffect(() => {
        api.get('summary').then(resp => {
            setSummaries(resp.data);
        });
    }, []);

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => 
                <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl h-10 w-10 flex itmes-center justify-center font-bold">
                    {weekDay}
                </div>)}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                summaries.length &&
                summaryDates.map((date) => {
                    const dayInSummary = summaries.find(day => {
                    return dayjs(date).isSame(day.date, 'day')
                })

                return (
                <HabitDay 
                    key={date.toString()}
                    date={date}
                    amount={dayInSummary?.amount} 
                    defaultCompleted={dayInSummary?.completed} 
                />
                )
                })
            }

            {
                amountOfDaysToFill > 0 && 
                Array.from({length: amountOfDaysToFill}).map((_, i) => 
                    <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
                )
            }
            </div>
        </div>
    );
}

export default SummaryTable;