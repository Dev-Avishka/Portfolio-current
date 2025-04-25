import './styles/app.universal.css'
import './styles/settings.css'
import Footer from './components/footer'
export default function Settings(){
    return(
        <div className='app'>
            <div className='settings'>
                <h1>Settings</h1>
                <br></br>
                <div className='about'>
                    <h2>Portfolio OS</h2>
                    <h3>version 1.0</h3>
                </div>
                <div className='bar'>
                    <h2>Created by Dev Avishka</h2>
                </div>
                <div className='bar'>
                    <h2>MIT License</h2>
                </div>

                <Footer></Footer>
            </div>
        </div>
    )
}