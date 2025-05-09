import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
    children: JSX.Element
}

const ProtectedRoutes: FunctionComponent<ProtectedRoutesProps> = ({ children }) => {
    const user = useSelector((state: any) => state.auth.user);

    if(!user) {
        return <Navigate to={"/login"} replace />
    }

    return children
}

export default ProtectedRoutes;