import React, {useEffect, useLayoutEffect, useState} from "react"; // eslint-disable-line no-unused-vars
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import './App.scss';
import './assets/sticker/sticker.scss';
// ** img ** //

import Hamkerlogo from './assets/logo/logo-full.svg';

// ** component ** //
import Header from './components/Header';
import NavModal from './components/NavModal';
import Footer from './components/Footer';
import {setDate} from './components/getDate';
import Sticker from "./components/Sticker";
// ** routes ** //
import Home from './routes/Home';
import Todo from './routes/Todo';
import Calender from './routes/Calender';
import Calc from './routes/Calc'
// ** indexedDB ** //
import {installDB, getDB} from "./indexeddb/idb";
installDB();

function App() {
  let [navModal, setNav] = useState(false)
  let [today] = useState({
    y: setDate()[0],
    m: setDate()[1],
    d: setDate()[2]
  });
  let [theme, setTheme] = useState('#ffaf91');
  let [todoData, setTodoData] = useState('');
  let [calcData, setCalcData] = useState('');
  let [placholder, setPlaceholder] = useState(true);
  let [totalIncome, setTotalIncome] = useState(0);
  let [totalExpense, setTotalExpense] = useState(0);
  let [filter, setFilter] = useState({
    m: parseInt(today.m),
    y: today.y
  })
  let [screen, checkScreen] = useState(0);
  const todoDBupdate = function(){
    getDB('todo').then(function(i){
      setTodoData(i)
    }, function(error){
      console.log(error)
    })
  }
  const calcDBupdate = function(){
    getDB('calc').then(function(i){
      let sort = i.sort(function(a, b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          return b.id - a.id;
        }
      });
      setCalcData(sort)
      let result = {
        income: 0,
        expense: 0
      };
      for (let k = 0; k < i.length; k++) {
        let target = i[k];
        let targetDate = {
          year: new Date(target.date).getFullYear(),
          month: new Date(target.date).getMonth()+1
        }
        if(targetDate.month === filter.m && targetDate.year === filter.y){
          if (target.type === "income") {
            result.income += parseInt(target.money);
          } else if (target.type === "expense") {
            result.expense += parseInt(target.money);
          }
        }
        
      }
      setTotalIncome(result.income)
      setTotalExpense(result.expense)
    }, function(error){
      console.log(error)
    })
  }

  useLayoutEffect(()=>{
    todoDBupdate();
    calcDBupdate();
    checkScreen(window.screen.width)
  },[])
  useEffect(()=>{
    document.documentElement.style.setProperty(`--theme`,theme)
    if(theme){
      document.documentElement.style.setProperty(`--themeBack`,theme+'1e')
    } else {
      document.documentElement.style.setProperty(`--themeBack`,theme)
    }
  },[theme]);
  useEffect(()=>{
    if(todoData.length > 0){
      setPlaceholder(false)
    } else {
      setPlaceholder(true)
    }
  },[todoData])
  useEffect(()=>{
    calcDBupdate()
  },[filter])
  return (
    <div className="App">
      <Header logo={Hamkerlogo} setNav={setNav} setTheme={setTheme}/>
      {
        screen > 1020&& <Sticker/>
      }
      <Routes>
        <Route path="/" element={<Home placholder={placholder} totalIncome={totalIncome} totalExpense={totalExpense} todoData={todoData} todoUpdate={todoDBupdate}/>}></Route>
        <Route path="/todo" element={<Todo placholder={placholder} today={today} todoData={todoData} todoUpdate={todoDBupdate}/>}></Route>
        <Route path="/calender" element={<Calender today={today}/>}></Route>
        <Route path="/calc" element={<Calc today={today} totalIncome={totalIncome} totalExpense={totalExpense} calcData={calcData} calcUpdate={calcDBupdate} setFilter={setFilter}/>}></Route>
      </Routes>
      <Footer />
      {
        navModal && <NavModal navOff={setNav} navModal={navModal}/>
      }
    </div>
  );
}

export default App;
