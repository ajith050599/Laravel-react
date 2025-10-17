import React from 'react'

export default function UserCard({ name, email }) {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{email}</p>
    </div>
  )
}
