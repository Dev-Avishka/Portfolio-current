import './styles/app.universal.css'
import './styles/skills.css'

export default function Skills(){
    return(
        <div className='app'>
            <center><h1 className='Title'>My Skills</h1></center>
            <div className='languages'>
                <h1>Languages I know</h1>
                <div className='box_langs'>
                    <img src='skills/js.png' style={{ width:'60px'}} alt='Js'></img>
                    <img src='skills/java.png' style={{ width:'60px'}} alt='Java'></img>
                    <img src='skills/python.png' style={{ width:'60px'}} alt='Python'></img>
                    <img src='skills/c-sharp.png' style={{ width:'60px'}} alt='C#'></img> 
                    <img src='skills/Go.png' style={{ width:'60px'}} alt='GO'></img> 
                    <img src='skills/Kotlin.png' style={{ width:'60px'}} alt='Kotlin'></img> 
                    <img src='skills/typescript.png' style={{ width:'60px'}} alt='Type Script'></img> 
                    <img src='skills/dart.png' style={{ width:'60px'}} alt='Dart'></img> 
                </div>
            </div>
            <div className='frameworks'>
                <h1>Frameworks and Technologies I know</h1>
                <div className='box_langs'>
                    <img src='skills/react.png' style={{ width:'60px'}} alt='React'></img>
                    <img src='skills/nextjs.png' style={{ width:'60px'}} alt='Next'></img>
                    <img src='skills/spring.png' style={{ width:'60px'}} alt='Spring'></img>
                    <img src='skills/gin.png' style={{ width:'60px'}} alt='Go Gin'></img>
                    <img src='skills/pytorch.svg' style={{ width:'60px'}} alt='Pytorch'></img>
                    <img src='skills/tensor.png' style={{ width:'60px'}} alt='TensorFlow'></img>
                    <img src='skills/unity.png' style={{ width:'60px'}} alt='Unity'></img>
                    <img src='skills/flutter.png' style={{ width:'60px'}} alt='Unity'></img>
                </div>
            </div>

            <br></br>
            <br></br>
            <center>
                <div className="skills">
                    <h1>What I do best</h1>
                    <div className="skill-list box">
                        <ul>
                            
                            <li>Machine Learning Model Development</li>
                            <li>Game Development</li>
                            <li>Front End Development</li>
                            <li>Backend Development (REST APIs)</li>
                        </ul>
                    </div>
                </div>
            </center>
  
        
        </div>
    )
    
}