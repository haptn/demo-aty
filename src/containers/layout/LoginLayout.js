import React from 'react'
import { ATYLogoImg } from '../../assets'
import { FormLogin } from '../../components'

function LoginLayout() {
  return (
    <div
      style={{ 
        width: '100vw', height: '100vh',
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1096%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='url(%23SvgjsLinearGradient1097)'%3e%3c/rect%3e%3cpath d='M66 1080L1146 0L1624.5 0L544.5 1080z' fill='url(%23SvgjsLinearGradient1098)'%3e%3c/path%3e%3cpath d='M697.6 1080L1777.6 0L2491.6 0L1411.6 1080z' fill='url(%23SvgjsLinearGradient1098)'%3e%3c/path%3e%3cpath d='M1868 1080L788 0L176 0L1256 1080z' fill='url(%23SvgjsLinearGradient1099)'%3e%3c/path%3e%3cpath d='M1172.4 1080L92.40000000000009 0L-125.09999999999991 0L954.9000000000001 1080z' fill='url(%23SvgjsLinearGradient1099)'%3e%3c/path%3e%3cpath d='M1128.0216951423854 1080L1920 288.0216951423855L1920 1080z' fill='url(%23SvgjsLinearGradient1098)'%3e%3c/path%3e%3cpath d='M0 1080L791.9783048576145 1080L 0 288.0216951423855z' fill='url(%23SvgjsLinearGradient1099)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1096'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='50%25' x2='100%25' y2='50%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1097'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 13%2c 89%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='0%25' y1='100%25' x2='100%25' y2='0%25' id='SvgjsLinearGradient1098'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='100%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient1099'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`,
        backgroundSize: '100% 100%'
      }}
      className='flex-center'
    >
      <div style={{ 
        width: '360px',
        padding: '24px',
        background: '#fff', borderRadius: '12px',
        position: 'relative'
      }}>
        <div style={{
          width: '100px', height: '100px',
          overflow: 'hidden',
          borderRadius: '100%',
          backgroundColor: '#fff',
          boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .2)',
          position: 'absolute',
          top: '-18%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}>
          <img src={ATYLogoImg} alt='logo'
            style={{ 
              width: '100%', height: '100%', objectFit: 'cover' 
            }}
          />
        </div>

        <FormLogin/>
      </div>
    </div>
  )
}

export default LoginLayout