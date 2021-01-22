import React from "react";

export default function Error ({ location }){ 
return (<div className={"whoops-404"}>
    <h1>'{ location.pathname }' 경로의 자원을 찾을 수 없습니다.</h1>
</div>)}