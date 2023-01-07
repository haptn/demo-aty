import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

function NotFound() {
  const navigate = useNavigate()
  
  return (
    <div
      className='w-100 h-full flex-center text-center'
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1048%26quot%3b)' fill='none'%3e%3cpath d='M125 1080L1205 0L2145.5 0L1065.5 1080z' fill='url(%23SvgjsLinearGradient1049)'%3e%3c/path%3e%3cpath d='M696.6 1080L1776.6 0L1914.6 0L834.6 1080z' fill='url(%23SvgjsLinearGradient1049)'%3e%3c/path%3e%3cpath d='M1811 1080L731 0L8 0L1088 1080z' fill='url(%23SvgjsLinearGradient1050)'%3e%3c/path%3e%3cpath d='M1253.4 1080L173.4000000000001 0L-510.5999999999999 0L569.4000000000001 1080z' fill='url(%23SvgjsLinearGradient1050)'%3e%3c/path%3e%3cpath d='M899.0669371226078 1080L1920 59.06693712260778L1920 1080z' fill='url(%23SvgjsLinearGradient1049)'%3e%3c/path%3e%3cpath d='M0 1080L1020.9330628773922 1080L 0 59.06693712260778z' fill='url(%23SvgjsLinearGradient1050)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1048'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='100%25' x2='100%25' y2='0%25' id='SvgjsLinearGradient1049'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='100%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient1050'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`,
        backgroundSize: '100% 100%'
      }}
    >
      <span>
        <p><b>Whoops...</b></p>
        404 - Page not found
        <br/><br/>
        <Button type='primary' onClick={() => navigate(-1)}>
          Go back
        </Button>
      </span>
    </div>
  )
}

export default NotFound