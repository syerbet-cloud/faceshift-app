import React, {useState, useEffect} from 'react'
import axios from 'axios'
export default function Dashboard(){
  const [jobs,setJobs]=useState([])
  useEffect(()=>{ async function load(){ try{ const res = await axios.get('/api/jobs_list').catch(()=>({data:[]})); setJobs(res.data||[]) }catch(e){} } load() },[])
  return (<div className="panel"><h2>Dashboard</h2><p>Recent jobs (demo)</p><pre>{JSON.stringify(jobs,null,2)}</pre></div>)
}
