import React from "react";
import Layout from "./layout";

export default function HomePage() {
    return (
        <Layout>
            <h1>
                This is the Home Page :)
            </h1>
        </Layout>
    );
}



/*<Route path="/layout" element={<Layout/>} >
<Route path="/home" element={<HomePage />} />
</Route>
*/