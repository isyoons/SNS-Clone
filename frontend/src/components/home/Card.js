import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import * as api from '../../lib/api';
import TestImage from './TestImage.jpg';
import Profile from './profile.jpg';
import CommentList from './CommentList';

const Card = ({ cardData }) => {
	const { post_id, contents, likes_count, comments_count } = cardData;

	const [comment, setComment] = useState({ comment: '' });

	// 컨텐츠 길이 체크(더보기) + /n 체크 필요
	let flag = true;
	let sContents = contents;
	if (contents.length > 100) {
		flag = true;
		sContents = contents.substring(0, 100);
	} else {
		flag = false;
	}

	// ref를 위한 변수 선언
	const textareaRef = useRef(null);

	const [state, setState] = useState({
		goodFlag: false,
		changeFlag: true,
		comment: true,
		commentLengthFlag: flag,
	});

	const settings = {
		dots: true,
		infinite: false,
		draggable: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendDots: dots => <ul> {dots} </ul>,
	};

	const style1 = {
		position: 'absolute',
		top: '-5px',
		left: '-5px',
		width: '42px',
		height: '42px',
	};

	const style2 = {
		width: '32px',
		height: '32px',
	};

	// 좋아요 클릭 이벤트
	const goodEvent = () => {
		if (state.goodFlag) {
			setState({ ...state, goodFlag: false });
		} else {
			setState({ ...state, goodFlag: true });
		}
	};

	// 사진 더블클릭 이벤트(좋아요)
	const imageGoodEvent = async () => {
		setState({ ...state, goodFlag: true });
		try {
			const data = await api.getHome();
			alert(data[0].author);
		} catch (err) {
			console.log('에러발생');
			console.log(err);
		}
	};

	// 댓글 달기 글자수 체크
	const commentChangeEvent = e => {
		if (e.target.value.length > 0) {
			setState({ ...state, changeFlag: false });
			setComment({ comment: e.target.value });
		} else {
			setState({ ...state, changeFlag: true });
		}
	};

	// 댓글 달기(버튼클릭)
	const addEvent = e => {
		alert(`댓글 : ${comment.comment}`);
		e.preventDefault();
	};

	// 댓글 달기(엔터)
	const pressEnterEvent = e => {
		if (e.key === 'Enter' && state.comment) {
			e.preventDefault();
			addEvent(e);
			e.target.value = '';
		}
	};

	// 더보기
	const moreClick = () => {
		setState({ ...state, commentLengthFlag: false });
	};

	// 댓글달기 포커스
	const onFocusComment = () => {
		//  커서 이동을 원할 때,
		textareaRef.current.focus();
	};

	return (
		<article
			className="_8Rm4L M9sTE L_LMM SgTZ1 ePUX4"
			role="presentation"
			tabIndex="-1"
		>
			<header className="Ppjfr UE9AK wdOqh">
				<div className="Jv7Aj mArmR pZp3x">
					<div
						className="RR-M- h5uC0 mrq0Z"
						aria-disabled="false"
						role="button"
						tabIndex="0"
					>
						<canvas className="CfWVH" height="42" width="42" style={style1} />
						<span className="_2dbep" role="link" tabIndex="-1" style={style2}>
							<img
								alt="deejaysoda님의 프로필 사진"
								className="_6q-tv"
								data-testid="user-avatar"
								draggable="false"
								src={Profile}
							/>
						</span>
					</div>
				</div>
				<div className="o-MQd z8cbW">
					<div className="RqtMr">
						<div className="e1e1d">
							<span className="Jv7Aj mArmR MqpiF">
								<a
									className="sqdOP yWX7d _8A5w5 ZIAjV"
									href={post_id}
									tabIndex="0"
								>
									{post_id}
								</a>
							</span>
						</div>
					</div>
				</div>
			</header>

			<div onDoubleClick={imageGoodEvent}>
				<Slider {...settings}>
					<div className="eLAPa kPFhm">
						<div className="KL4Bh">
							<img className="FFVAD" src={TestImage} alt="slideImage" />
						</div>
					</div>
					<div className="eLAPa kPFhm">
						<div className="KL4Bh">
							<img className="FFVAD" src={TestImage} alt="slideImage" />
						</div>
					</div>
					<div className="eLAPa kPFhm">
						<div className="KL4Bh">
							<img className="FFVAD" src={TestImage} alt="slideImage" />
						</div>
					</div>
					<div className="eLAPa kPFhm">
						<div className="KL4Bh">
							<img className="FFVAD" src={TestImage} alt="slideImage" />
						</div>
					</div>
					<div className="eLAPa kPFhm">
						<div className="KL4Bh">
							<img className="FFVAD" src={TestImage} alt="slideImage" />
						</div>
					</div>
				</Slider>

				{/* {state.goodFlag === true ?
					<div className="_6jUvg">
						<span className="Y9j-N coreSpriteFeedLikeBig"></span>
					</div>
				: <div></div>} */}
			</div>

			<div className="eo2As">
				<section className="ltpMr Slqrh">
					<span className="fr66n">
						<button className="wpO6b" type="button" onClick={goodEvent}>
							<div className="QBdPU">
								<span className="FY9nT">
									{state.goodFlag === false ? (
										<svg
											aria-label="좋아요"
											className="_8-yf5 "
											fill="#262626"
											height="24"
											viewBox="0 0 48 48"
											width="24"
										>
											<path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
										</svg>
									) : (
										<svg
											aria-label="좋아요 취소"
											className="_8-yf5 "
											fill="#ed4956"
											height="24"
											viewBox="0 0 48 48"
											width="24"
										>
											<path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
										</svg>
									)}
								</span>
							</div>
						</button>
					</span>
					<span className="_15y0l">
						<button className="wpO6b" type="button" onClick={onFocusComment}>
							<div className="QBdPU">
								<svg
									aria-label="댓글 달기"
									className="_8-yf5 "
									fill="#262626"
									height="24"
									viewBox="0 0 48 48"
									width="24"
								>
									<path
										clipRule="evenodd"
										d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
										fillRule="evenodd"
									/>
								</svg>
							</div>
						</button>
					</span>
				</section>
				<section className="EDfFK ygqzn">
					<div className="Igw0E IwRSH eGOV_ ybXk5 vwCYk">
						<div className="Nm9Fw">
							<button className="sqdOP yWX7d _8A5w5" type="button">
								좋아요 <span>{likes_count}</span>개
							</button>
						</div>
					</div>
				</section>
				<div className="EtaWk">
					<div className="Igw0E IwRSH eGOV_ _4EzTm">
						<div className="Igw0E IwRSH eGOV_ _4EzTm pjcA_">
							<div
								className="QzzMF Igw0E IwRSH eGOV_ vwCYk"
								data-testid="post-comment-root"
							>
								<span className="Jv7Aj mArmR MqpiF">
									<a
										className="FPmhX notranslate MBL3Z"
										title={post_id}
										href={post_id}
										tabIndex="0"
									>
										{post_id}
									</a>
								</span>
								&nbsp;
								{state.commentLengthFlag === true ? (
									<span className="_8Pl3R">
										<span>{sContents}</span>
										<span className="_2UvmX">
											...&nbsp;
											<button className="sXUSN" onClick={moreClick}>
												더 보기
											</button>
										</span>
									</span>
								) : (
									<span className="_8Pl3R">
										<span>{contents}</span>
									</span>
								)}
							</div>
						</div>
						<div>
							<div className="Igw0E IwRSH eGOV_ _4EzTm pjcA_">
								<a className="r8ZrO" href="/p/CHxvxEoFQU7/" tabIndex="0">
									댓글 <span>{comments_count}</span>개 모두 보기
								</a>
							</div>
							{/* 댓글리스트 컴포넌트 */}
							<CommentList commentsData={cardData.comments} />
						</div>
					</div>
				</div>
				<div className="k_Q0X NnvRN">
					<a className="c-Yi7" href="/p/CHxvxEoFQU7/" tabIndex="0">
						<time
							className="_1o9PC Nzb55"
							dateTime="2020-11-19T15:25:24.000Z"
							title="2020년 11월 20일"
						>
							1시간 전
						</time>
					</a>
				</div>
				<section className="sH9wk _JgwE">
					<div className="RxpZH">
						<form className="X7cDz" method="POST">
							<textarea
								aria-label="댓글 달기..."
								placeholder="댓글 달기..."
								className="Ypffh"
								autoComplete="off"
								autoCorrect="off"
								onChange={commentChangeEvent}
								onKeyPress={pressEnterEvent}
								ref={textareaRef}
							/>
							<button
								className="sqdOP yWX7d y3zKF"
								disabled={state.changeFlag}
								type="submit"
								onClick={addEvent}
							>
								게시
							</button>
						</form>
					</div>
				</section>
			</div>
		</article>
	);
};

export default Card;
