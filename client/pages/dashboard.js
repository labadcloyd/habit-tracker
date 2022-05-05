
import css from '../styles/dashboard.module.css'
import { Navbar, DateChanger, MonthlyHabits } from "../components/layouts";
import { useEffect, useState } from 'react';
import { addHabitsToDate } from '../common/utils';
import { getAllUserHabits } from '../common/services/habit';
import { DATE_CHOICES } from '../common/constants/dates';

export default function Dashboard() {
	const [habits, setHabits] = useState(null)

	async function fetchData() {
		const res = await getAllUserHabits({ Start_Date: '2022-05-01', End_Date: '2022-05-30'})
		const formatedHabits = addHabitsToDate({habits: res.data, dateSortChoice: DATE_CHOICES.monthly, startingDate: '2022-05-01' })
		setHabits(formatedHabits)
	}

	useEffect(() => {
		fetchData()
	},[])
	return(
		<div className={css.pageWrapper}>
			<Navbar/>
			<div className={css.pageContainer}>
				<div className={css.contentContainer}>
					<DateChanger/>
					{habits === null ?
						<h1>Loading...</h1>
					:
						<MonthlyHabits habits={habits} />
					}
				</div>
			</div>
		</div>
	)
}