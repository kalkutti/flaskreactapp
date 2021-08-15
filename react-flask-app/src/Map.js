import MapList from "./MapList";
import RedBlack from "./RedBlack";
import MapDetails from "./MapDetails";
import { Link, Outlet, useRoutes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllMaps, getMaps, selectMapById, selectMapIds } from "./features/maps/mapsSlice";
import { selectActivityById } from "./features/maps/activitiesSlice";
import { useEffect } from "react";

const Map = () => useRoutes([
    { 
        path: '/', 
        element: <MapHome />,
        children: [
            { path: '/', element: <MapList /> },
            { path: 'redblack', element: <RedBlack /> },
            { path: ':mapId', element: <MapDetails /> },
        ]
    }
])

let SchldButton = ({ act }) => {
  return <p>{act ? <button>{act.date}</button> : <button>Re-schedule</button>}</p>
}

let MapExcerpt = ({ mapId }) => {
    const map = useSelector((state) => selectMapById(state, mapId))
    const activity = useSelector((state) => selectActivityById(state, mapId))

    return (
      <article className="map-excerpt">
        <h3>{map.userId}</h3>
        <p>{map.title}</p>
        <SchldButton act={activity}/>
      </article>
    )
  }

const MapHome = () => {
    const mapsOrdered = useSelector(selectMapIds)
    const mapStatus = useSelector((state) => state.maps.status)
    const dispatch = useDispatch()
    const error = useSelector((state) => state.maps.error)

    useEffect(() => {
        if (mapStatus === 'idle') {
            dispatch(getMaps())
        }
    }, [mapStatus, dispatch])

    let content

    if (mapStatus === 'loading') {
      content = <div className="loader">Loading...</div>
    } else if (mapStatus === 'succeeded') {
      content = mapsOrdered.map((mapId) => (
          <MapExcerpt key={mapId} mapId={mapId} />
      ))
    } else if (mapStatus === 'failed') {
      content = <div>{error}</div>
    }

    return (
        <div>
            <div>
                <h3>My Maps</h3>
                <ul>{content}</ul>
            </div>
            <Outlet />
        </div>
    );
}

export default Map;