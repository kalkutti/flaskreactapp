import { selectAllActivities, getActivities } from "./features/maps/activitiesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

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
        console.log(activities)
        content = activities.map((activity) => (
            <ul key={activity.id}> {activity.id}</ul>
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