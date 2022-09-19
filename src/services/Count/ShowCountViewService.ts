import { addDays, addMonths, addWeeks, addYears, format, getDate, getDaysInMonth, getMonth, getYear, startOfWeek } from 'date-fns';
import prismaClient from '../../prisma'

interface CountRequest {
    profile_id: string;
    index: number;
    type_date: string;
    userId: string;
}

class ShowCountViewService {
    async execute({ userId, profile_id, type_date, index }: CountRequest) {


        let date = new Date()

        const profile = await prismaClient.profile.findUnique({
            where: {
                id: profile_id
            }
        })

        if (profile.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário.")
        }

        if (type_date == "yearly") {
            const countYear = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    year: format(addYears(date, index), "yyyy")
                }
            })
            const months = [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outrubro",
                "Novembro",
                "Dezembro",
            ];

            const monthsViews = [];

            let total_views = 0

            months.map((months, index) => {
                let countMonth = countYear.filter((views) => views.month == ("00" + (index + 1)).slice(-2))
                monthsViews.push(countMonth.length);

                total_views += countMonth.length
            });

            return {
                months,
                monthsViews,
                total_views
            };
        }

        if (type_date == "monthly") {
            let dateMonth = addMonths(date, index)

            const countMonth = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    month: format(dateMonth, "MM"),
                    year: format(dateMonth, "yyyy")
                }
            })

            const daysOfMonth = getDaysInMonth(dateMonth);

            const days = Array.from({ length: daysOfMonth }, (_, index) => index + 1);

            const totalOfViewsInDay = [];

            let total_views = 0

            days.map((dayViews, index) => {
                let countDay = countMonth.filter((views) => views.date.substr(0, 2) == ("00" + (index + 1)).slice(-2))

                totalOfViewsInDay.push(countDay.length);

                total_views += countDay.length
            });

            return {
                days,
                totalOfViewsInDay,
                total_views
            };
        }
        if (type_date == "weekly") {
            let dateWeek = addWeeks(date, index)

            const week_days = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
            const startWeek = startOfWeek(dateWeek);

            const segFullDate = addDays(startWeek, 1);
            const terFullDate = addDays(startWeek, 2);
            const quaFullDate = addDays(startWeek, 3);
            const quiFullDate = addDays(startWeek, 4);
            const sexFullDate = addDays(startWeek, 5);
            const sabFullDate = addDays(startWeek, 6);

            const domDate = `${String(getDate(startWeek)).padStart(2, "0")}/${String(
                getMonth(startWeek) + 1
            ).padStart(2, "0")}/${getYear(startWeek)}`;

            const segDate = `${String(getDate(segFullDate)).padStart(2, "0")}/${String(
                getMonth(segFullDate) + 1
            ).padStart(2, "0")}/${getYear(segFullDate)}`;

            const terDate = `${String(getDate(terFullDate)).padStart(2, "0")}/${String(
                getMonth(terFullDate) + 1
            ).padStart(2, "0")}/${getYear(terFullDate)}`;

            const quaDate = `${String(getDate(quaFullDate)).padStart(2, "0")}/${String(
                getMonth(quaFullDate) + 1
            ).padStart(2, "0")}/${getYear(quaFullDate)}`;

            const quiDate = `${String(getDate(quiFullDate)).padStart(2, "0")}/${String(
                getMonth(quiFullDate) + 1
            ).padStart(2, "0")}/${getYear(quiFullDate)}`;

            const sexDate = `${String(getDate(sexFullDate)).padStart(2, "0")}/${String(
                getMonth(sexFullDate) + 1
            ).padStart(2, "0")}/${getYear(sexFullDate)}`;

            const sabDate = `${String(getDate(sabFullDate)).padStart(2, "0")}/${String(
                getMonth(sabFullDate) + 1
            ).padStart(2, "0")}/${getYear(sabFullDate)}`;

            const viewsOfDom = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    date: domDate,
                },
            });

            const viewsOfSeg = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    date: segDate,
                },
            });

            const viewsOfter = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    date: terDate,
                },
            });

            const viewsOfQua = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    date: quaDate,
                },
            });

            const viewsOfQui = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    date: quiDate,
                },
            });

            const viewsOfSex = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    date: sexDate,
                },
            });

            const viewsOfSab = await prismaClient.viewProfile.findMany({
                where: {
                    profile_id: profile_id,
                    date: sabDate,
                },
            });

            const week_days_views = [
                viewsOfDom.length,
                viewsOfSeg.length,
                viewsOfter.length,
                viewsOfQua.length,
                viewsOfQui.length,
                viewsOfSex.length,
                viewsOfSab.length,
            ];

            const total_views = week_days_views.reduce((soma, i) => soma + i);


            return {
                week_days,
                week_days_views,
                total_views,
            };
        }
    }
}

export { ShowCountViewService }
