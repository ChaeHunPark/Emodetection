import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Common/Header/Header';
import './LandingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainBanner from './Section/MainBanner';
import SubBanner from './Section/SubBanner';
import TopButton from './Section/TopButton';
import Footer from '../Common/Footer/Footer';
import axios from 'axios';
import BasicTabs from './LandingTabMenu';



function LandingPage(props) {

  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  const [Contents, setContents] = useState([]);
  const [ContentsP, setContentsP] = useState([]);
  const [ContentsKorea, setContentsKorea] = useState([]);
  const [ContentsAmerica, setContentsAmerica] = useState([]);
  const [ContentsAction, setContentsAction] = useState([]);
  const [ContentsRandom, setContentsRandom] = useState([]);
  const [ContentsHappy, setContentsHappy] = useState([]);
  const [ContentsAnger, setContentsAnger] = useState([]);
  const [ContentsSadness, setContentsSadness] = useState([]);
  const [EmotionState, setEmotionState] = useState(localStorage.getItem("emotion").split('"')[1]);
  const [EmotionContents, setEmotionContents] = useState([]);
  const [EmotionMsg, setEmotionMsg] = useState(null);





  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    ScrollY > 100 ? setBtnStatus(true) : setBtnStatus(false);
  }


  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnStatus(false);
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  useEffect(() => {

    FetchContents();
    FetchContentsP();
    FetchEmotionContents();
    FetchContentsKorea();
    FetchContentsAmerica();
    FetchContentsAction();
    FetchContentsRandom();
    FetchContentsHappy();
    FetchContentsAnger();
    FetchContentsSadness();
    // console.log('props :',props);
    // console.log('props.match.path : ',props.match.path);
    // console.log(`props.match.params : ${props.match.params.movieId}`);

  }, [])

  const FetchContents = () => {
    axios.post("/api/users/contents/getContents")
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.contents);
          setContents(response.data.contents);
        } else {
          alert("???????????? ????????? ??? ????????????.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FetchContentsP = () => {
    axios.post("/api/users/contents/getContentsP")
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.contents);
          setContentsP(response.data.contents);
        } else {
          alert("???????????? ????????? ??? ????????????.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FetchContentsAmerica = () => {
    axios.post("/api/users/contents/America").then((response) => {
      if (response.data.success) {
        console.log(response.data.contents);
        setContentsAmerica(response.data.contents);
      } else {
        console.log("????????? ??????");
      }
    });
  };
  const FetchEmotionContents = () => {
    axios
      .post(`/api/users/contents/emotion/${EmotionState}`)
      .then((response) => {
        if (response.data.success) {
          setEmotionState(localStorage.getItem("emotion").split('"')[1]);
          setEmotionContents(response.data.contents);
          setEmotionMsg(`${EmotionState} ????????? ??????????????????.`);
        } else {
          console.log("????????? ??????");
        }
      });
  };
  const FetchContentsKorea = () => {
    axios.post("/api/users/contents/Korea").then((response) => {
      if (response.data.success) {
        console.log(response.data.contents);
        setContentsKorea(response.data.contents);
      } else {
        console.log("????????? ??????");
      }
    });
  };
  const FetchContentsAction = () => {
    axios.post("/api/users/contents/Action").then((response) => {
      if (response.data.success) {
        console.log(response.data.contents);
        setContentsAction(response.data.contents);
      } else {
        console.log("????????? ??????");
      }
    });
  };
  const FetchContentsHappy = () => {
    axios.post("/api/users/contents/Happy").then((response) => {
      if (response.data.success) {
        console.log(response.data.contents);
        setContentsHappy(response.data.contents);
      } else {
        console.log("????????? ??????");
      }
    });
  };
  const FetchContentsAnger = () => {
    axios.post("/api/users/contents/Anger").then((response) => {
      if (response.data.success) {
        console.log(response.data.contents);
        setContentsAnger(response.data.contents);
      } else {
        console.log("????????? ??????");
      }
    });
  };
  const FetchContentsSadness = () => {
    axios.post("/api/users/contents/Sadness").then((response) => {
      if (response.data.success) {
        console.log(response.data.contents);
        setContentsSadness(response.data.contents);
      } else {
        console.log("????????? ??????");
      }
    });
  };
  const FetchContentsRandom = () => {
    axios.post("/api/users/contents/Random").then((response) => {
      if (response.data.success) {
        console.log(response.data.contents);
        setContentsRandom(response.data.contents);
      } else {
        console.log("????????? ??????");
      }
    });
  };

  


  return (
    <>
      <Header />
      <MainBanner />
      <SubBanner label={EmotionMsg} Contents={EmotionContents} more={`/more/${EmotionState}`} />
      <SubBanner label="?????????" Contents={Contents} more={`/more/latestorder`} />
      <SubBanner label="?????????" Contents={ContentsP} more={`/more/manyspectators`} />
      <SubBanner label="????????????" Contents={ContentsKorea} />
      <SubBanner label="????????????" Contents={ContentsAmerica} />
      <SubBanner label="????????????" Contents={ContentsAction} />
      <SubBanner label="????????????" Contents={ContentsHappy} />
      <SubBanner label="????????????" Contents={ContentsSadness} />
      <SubBanner label="????????????" Contents={ContentsAnger} />
      <TopButton BtnStatus={BtnStatus} handleTop={handleTop} />
      <Footer />
    </>
  )

}

export default withRouter(LandingPage);
