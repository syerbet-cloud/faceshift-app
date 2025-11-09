import React, {useState} from 'react'
import axios from 'axios'
export default function Home(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [intended,setIntended]=useState('')
  const [file,setFile]=useState(null)
  const [result,setResult]=useState(null)
  const giveConsent = async ()=>{
    try{
      const res = await axios.post('/auth/register',{email, password: 'changeme'})
      await axios.post('/api/auth/register',{email,password:'changeme'}).catch(()=>{})
      const r = await axios.post('/api/consent',{name,email,intended_use:intended}).catch(()=>{})
      alert('Consent recorded — you can now upload an image.')
    }catch(e){
      console.error(e); alert('Consent error, but continuing.')
    }
  }
  const send = async ()=>{
    if(!file) return alert('Escolha uma imagem')
    const fd = new FormData()
    fd.append('image', file)
    fd.append('consent_email', email)
    setResult('Processing...')
    try{
      const res = await axios.post('/api/faceshift', fd, { headers: {'Content-Type':'multipart/form-data'} })
      setResult(JSON.stringify(res.data,null,2))
    }catch(e){ setResult('Error: '+(e.response?.data?.error||e.message)) }
  }
  return (<div className="panel">
    <h2>FaceShift.AI — Demo</h2>
    <p>Consent required. Free tier available. Outputs are watermarked.</p>
    <div>
      <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} /><br/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder="Intended use" value={intended} onChange={e=>setIntended(e.target.value)} /><br/>
      <button onClick={giveConsent}>Give Consent</button>
    </div>
    <hr/>
    <div>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} /><br/>
      <button onClick={send}>Process Image</button>
      <pre style={{whiteSpace:'pre-wrap',marginTop:12}}>{result}</pre>
    </div>
  </div>)
}
