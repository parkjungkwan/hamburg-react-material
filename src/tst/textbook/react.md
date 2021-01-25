챕터

Server 는 Data 의 제공


JS: var 이것이 전역개념이어서 ... ES6 에서는
var -> const, let 지역개념으로 전환

p64
바벨, 트랜스파일,

p71
리액트 작성방법
component

p83
$.each(arr, (i, j) =>{

})

props.data.map( (i, j) =>{ {i} {j}})

p88. props vs. state
props := constant
state := (variable ->) mutable
let a = ''

컴포넌트가 (자제적으로 보관하는 this.state  => class 기반 리액트시절)
(리덕스가 보관하는 state) 가 있기 때문에
별도의 props 를 전달하지 않아도 data  전송이 가능하다.

p.99 key 목록
props.data.map(i, j) => return <key={data.id}><>


p.100 마운트는 상태의 CRUD 이다.
componentWillMount
componentDidMount
componentWillReceiveMount
...

useEffect(() => {   // componentDidMount
  // Your code here
}, []);


p.114  page vs. component
차이점은 data 의 유무...

page 가 상태(실제 데이터) 를 가지고 있는 것 : 
But... 
무상태로 진화

p.287 리덕스
p.292 flux 는 흐름 (stream)
Action 은 필요에 따라 해당 시점(이벤트 + 마운트) 에서
데이터의 흐름(flux)이 시작됩니다.
store 에서 인식할 수 있는 type 을 가집니다.

p.295 리덕스는 flux 를 기반으로 단방향 으로 상태를 구현하는 라이브러리

액션은 객체다. {type: ... }
상태 (state) 객체. {}

{} -  function<P,R>  - {type: '', ...}
state -  reducer    - action

function({type: ...,}){ return {state} } // reducer

p.300 리덕스의 3원칙
single source- state
const action - action
pure function : param ok, return ok



