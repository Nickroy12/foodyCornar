'use client'
import Image from 'next/image'
import React from 'react'

export const Card = ({d}) => {
  return (
    <div>
                <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
      <Image src={d.image_link}  width={200} height={200} alt='data'/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {d.dish_name}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div>
      <div className="badge badge-outline">Products</div>
    </div>
  </div>
</div>
    </div>
  )
}
