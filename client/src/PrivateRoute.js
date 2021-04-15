import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, layout: Layout, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (

                    <Layout>
                        <RouteComponent {...routeProps} />
                    </Layout>

                ) : (
                    <Redirect to={"/login"} />
                )
            }
        />
    );
};


export default PrivateRoute