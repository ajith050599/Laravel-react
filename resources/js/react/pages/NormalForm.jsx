import React, { useState } from 'react'
import Counter from '../components/Counter'
import Form from '../components/Form'
import UserCard from '../components/UseCard'

export default function Dashboard() {
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [submitted, setSubmitted] = useState(false)

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   setSubmitted(true)
  // }

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-xl mt-6">
      <h1 className="text-2xl font-bold mb-4">Sample Form</h1>

      {/* <Counter /> */}

      {/* <form onSubmit={handleSubmit}>
        <FormInput label="Name" value={name} onChange={setName} />
        <FormInput label="Email" type="email" value={email} onChange={setEmail} />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form> */}
      <Form />

      {/* {submitted && (
        <div className="mt-4">
          <UserCard name={name} email={email} />
        </div>
      )} */}
    </div>
  )
}
