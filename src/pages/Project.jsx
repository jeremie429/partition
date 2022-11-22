import React from 'react'

import CardComponent from '../components/CardComponent'
import partitionImg from '../assets/partition_img.png'
import "../styles/projects.scss"
const Project = () => {
  return (
    <div className='projects-page'>
        <h1>All What I achieved as projects app</h1>

        <div className="projects-container">
            <CardComponent imgSrc = {partitionImg} altImg = {"Partition Image"} title={"Partition"} contentText="Partition project is an app who help user to place partition's notes, read and save them as video files on their local machine " linkRef={"/partition"} />
            <CardComponent imgSrc = {partitionImg} altImg = {"Partition Image"} title={"Partition"} contentText="Partition project is an app who help user to place partition's notes, read and save them as video files on their local machine " linkRef={"/partition"} />
            <CardComponent imgSrc = {partitionImg} altImg = {"Partition Image"} title={"Partition"} contentText="Partition project is an app who help user to place partition's notes, read and save them as video files on their local machine " linkRef={"/partition"} />
        </div>
        
    </div>
  )
}

export default Project