import moment from 'moment'
import { useEffect, useState } from 'react'
import { DEFAULT_HABIT_LIST } from '../../../common/constants'
import { createUserHabitList, updateUserHabitList } from '../../../common/services'

import { Close } from '../../../public/svgs'
import { Button, TextInput, ColorPicker, NumberPicker } from '../../common'
import css from './habitModalList.module.css'

export default function HabitModalList(props) {
	const { 
		habitList, 
		isOpenHabitModalList, 
		setOpenHabitModalList, 
		habits, 
		setHabits,
	} = props

	const [habitListState, setHabitListState] = useState(habitList)

	async function updateHabit() {
		const res = await updateUserHabitList(habitListState)
		if (res.status === 200) {
			let newHabitList = [...habits]
			for (let i = 0; i < newHabitList.length; i++) {
				if (newHabitList[i].habit_name === habitState.habit_name) {
					for( let j = 0; j < newHabitList[i].habits.length; j++) {
						if (newHabitList[i].habits[j].habit_name === res.data.habit_name) {
							newHabitList[i].habits[j].habit_name = res.data.habit_name 
						}
					}
					newHabitList[i].habit_name = habitState.habit_name
				}
			}
			console.log(newHabitList)
			setHabits(newHabitList)
		}

	}
	async function createHabit() {
		const res = await createUserHabitList(habitListState)
		if (res.status === 200) {
			
		}
	}

	useEffect(() => {
		setHabitListState(habitList)
	}, [habitList])

	return(
		<div className={css.wrapper} style={{display: isOpenHabitModalList ? "flex" : "none"}}>
			<div className={css.container}>
				{isOpenHabitModalList && 
					<>
						<div className={css.headerWrapper}>
							<div className={css.titleContainer}>
								<h1>{!habitList.habit_name ? "Create Habit" : "Edit Habit"}</h1>
							</div>
							<Button onClick={ ()=> {setOpenHabitModalList(false); setHabitListState(DEFAULT_HABIT_LIST)} }>
								<Close/>
							</Button>
							
						</div>
						<TextInput
							value={habitListState.habit_name || ""}
							setValue={ (value) => { setHabitListState({...habitListState, habit_name: value}) } }
							placeholder="Habit name"
						/>
						<NumberPicker
							id={css.requiredCountContainer}
							value={habitListState.default_repeat_count || 0}
							setState={ (value) => { setHabitListState({...habitListState, target_repeat_count: value}) } } 
						>
							Default Target Repeat Count
						</NumberPicker>
						<ColorPicker
							value={habitListState.color || ""}
							setValue={(value) => { setHabitListState({...habitListState, color: value}) }}
						> 
						Default Color
						</ColorPicker> 
							
						
						<div className={css.rowContainer}>
							<Button 
								primary={false} 
								onClick={() => {
									if (habitListState.id) {updateHabit()}
									if (!habitListState.id) {createHabit()}
								}}
							>
								Save
							</Button>
						</div>
					</>
				}
			</div>
		</div>
	)
}