import { selectAllActivities, getActivities } from "./features/maps/activitiesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

let ViewDate = (activities) => {
    const nact = activities.length
    let initDate = activities[0].date
    let indexSta = 0
    let act

    while (indexSta < nact) {
        console.log(activities[indexSta].date)
        for (; indexSta < nact; indexSta++) {
            act = activities[indexSta]
            if (act.date === initDate) {
                // add a view for current date
                console.log(activities[indexSta].id)
            }
            else {
                initDate = act.date
                break
            }
        }
    }
}

let GroupViewDate = ({iDate}) => {
    return (
        <div>
            <h3>{iDate}</h3>
        </div>
    );
}

const MapList = () => {
    const activities = useSelector(selectAllActivities)
    const activityStatus = useSelector((state) => state.activities.status)
    const dispatch = useDispatch()
    const error = useSelector((state) => state.activities.error)

    useEffect(() => {
        if (activityStatus === 'idle') {
            dispatch(getActivities())
        }
    }, [activityStatus, dispatch])

    let content

    if (activityStatus === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if (activityStatus === 'succeeded') {
        ViewDate(activities)
        content = activities.map((activity) => (
            <div>
                <GroupViewDate iDate={activity.date}/>
                <ul key={activity.id}> {activity.id}</ul>
            </div>
        ))
    } else if (activityStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div>
            <h2>Please select a map</h2>
            <div>{content}</div>
        </div>
    );
}

export default MapList;