import Home from "@/views/Home";
import React from "react";
// import lazyLoad from "@/router/LazyLoad";
// 首页模块
const homeRouter= [
	{
		element: <Home />,
		children: [
			{
				path: "/home",
				// element: lazyLoad(React.lazy(() => import("@/views/Home"))),
				element: <Home />,
				meta: {
					requiresAuth: true,
					title: "首页",
					key: "home"
				}
			}
		]
	}
];

export default homeRouter;