import React from 'react'
import Navigatorbar from '../components/navigatorbar'
import './page_style/page.css'
import Footer from '../components/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAsia, faNetworkWired, faStopwatch, faTableColumns } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const IndexPage = () => {
  return (
    <>
      <Navigatorbar />
      <section className='first-landing py-4' style={{backgroundColor: '#FAF9F6', fontFamily: 'Bai Jamjuree, sans-serif'}}>
        <div className='container box1 rounded py-5'>
          <div className='titlemain text-start text-dark h1 mx-3 mb-3'><div className='mx-3 '>Tham-kanban</div></div>
          <div className='my-4'>
            <div className='describe mx-5'>ส่งงานเนียบ เร็วฉับไว้ ครอบจักรวาล ด้วยการบ้าน</div>
            <div className='describe mx-5'>และคอนเซ็ปต์การทำงานแบบ kanban</div>
            <div className='bottom-line mx-3 mt-2'></div>
          </div>
          <div className='button mx-5 my-3 d-flex gap-3'>
            <Link className='btn btn-success' to='/authorize'>ลองใช้ฟรี</Link>
            <Link className='btn btn-light' to='/authorize'>เข้าสู่ระบบ</Link>
          </div>
          <div className='img-1'>
            <img src={require('./static/kanban.png')} alt='' height={350}/>
          </div>
        </div>
      </section>

      <section className='second-landing py-4'>
        <div className='dark-overlay container h-100 d-flex align-items-center'>
          <div className='card-container d-flex gap-4'>
            <div className='card bg-transparent shadow-lg text-center' style={{border:'none'}}>
              <div className='card-body glass'>
                <div className='d-flex justify-content-center align-items-center gap-2'>
                  <h1>Workflow</h1>
                  <FontAwesomeIcon icon={faNetworkWired} size='2xl' />
                </div>
                <p className="card-text text-start">
                  เซนเซอร์ คอรัปชันเอสเปรสโซมวลชนรีโมทโซนี่ ซิมโฟนีตัวตนนายพรานแมชชีน น็อค อุตสาหการ ไทม์ฟิวเจอร์ทัวร์ปฏิสัมพันธ์ โคโยตีปาสกาลโมหจริต เทคโน ลอจิสติกส์วาริชศาสตร์ ขั้นตอนสเต็ปนินจามยุราภิรมย์ นิวโปรเจ็คเพรสไบเบิล 
                </p>
              </div>
            </div>
            <div className='card bg-transparent shadow-lg text-center' style={{border:'none'}}>
              <div className='card-body glass'>
                <div className='d-flex justify-content-center align-items-center gap-2'>
                  <h1>Organize</h1>
                  <FontAwesomeIcon icon={faTableColumns} size='2xl' />
                </div>
                <p className="card-text text-start">
                  เซนเซอร์ คอรัปชันเอสเปรสโซมวลชนรีโมทโซนี่ ซิมโฟนีตัวตนนายพรานแมชชีน น็อค อุตสาหการ ไทม์ฟิวเจอร์ทัวร์ปฏิสัมพันธ์ โคโยตีปาสกาลโมหจริต เทคโน ลอจิสติกส์วาริชศาสตร์ ขั้นตอนสเต็ปนินจามยุราภิรมย์ นิวโปรเจ็คเพรสไบเบิล 
                </p>
              </div>
            </div>
            <div className='card bg-transparent shadow-lg text-center' style={{border:'none'}}>
              <div className='card-body glass'>
                <div className='d-flex justify-content-center align-items-center gap-2'>
                  <h1>Overview</h1>
                  <FontAwesomeIcon icon={faEarthAsia} size='2xl' />
                </div>
                <p className="card-text text-start">
                  เซนเซอร์ คอรัปชันเอสเปรสโซมวลชนรีโมทโซนี่ ซิมโฟนีตัวตนนายพรานแมชชีน น็อค อุตสาหการ ไทม์ฟิวเจอร์ทัวร์ปฏิสัมพันธ์ โคโยตีปาสกาลโมหจริต เทคโน ลอจิสติกส์วาริชศาสตร์ ขั้นตอนสเต็ปนินจามยุราภิรมย์ นิวโปรเจ็คเพรสไบเบิล 
                </p>
              </div>
            </div>
            <div className='card bg-transparent shadow-lg text-center' style={{border:'none'}}>
              <div className='card-body glass'>
                <div className='d-flex justify-content-center align-items-center gap-2'>
                  <h1>Time saving</h1>
                  <FontAwesomeIcon icon={faStopwatch} size='2xl' />
                </div>
                <p className="card-text text-start">
                  เซนเซอร์ คอรัปชันเอสเปรสโซมวลชนรีโมทโซนี่ ซิมโฟนีตัวตนนายพรานแมชชีน น็อค อุตสาหการ ไทม์ฟิวเจอร์ทัวร์ปฏิสัมพันธ์ โคโยตีปาสกาลโมหจริต เทคโน ลอจิสติกส์วาริชศาสตร์ ขั้นตอนสเต็ปนินจามยุราภิรมย์ นิวโปรเจ็คเพรสไบเบิล 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default IndexPage