import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

const index = ({imgSrc, altImg, title, contentText, linkRef, }) => {
  return (
    <NavLink
    to={linkRef}
          exact="true"
          activeclassname="active"
          className="card-link"
    >
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="140"
      image={imgSrc}
      alt={altImg}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {contentText}
      </Typography>
    </CardContent>
    
  </Card>
  </NavLink>
  )
}

export default index