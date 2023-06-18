import styled, { css } from "styled-components";
import colors from "./colors";

const fontWeights = {
  extra_bold: 900,
  bold: 700,
  medium: 500,
  regular: 400,
};

const fonts = {
  nato_sans: "Noto Sans CJK KR",
  happiness_sans: "Happiness Sans",
};

const TitleBase = styled.div`
  font-family: ${fonts.happiness_sans};
  font-weight: ${fontWeights.extra_bold};
  letter-spacing: -0.05rem;
  color: ${colors.gray7};
`;

/**
 * 대타이틀
 * @description 레시피/북마크/검색결과/클래스 페이지
 */
const BT_BASIC = styled(TitleBase)`
  font-size: 3rem;
  line-height: 3.7rem;
`;

/**
 * 모달 대타이틀/캘린더 날짜 타이틀/실시간 클래스 대타이틀
 * @description 캘린더(식단 기록, 식단 수정) / 홈(재료 추가하기, 계정 설정, 프로필 변경, 우리집 식재료) 레시피(상세 레시피) / 클래스(클래스 열기)
 */
const BT_SPECIAL = styled(TitleBase)`
  font-size: 2.4rem;
  line-height: 3rem;
`;

/**
 * 소타이틀(20)
 * @description 캘린더 타이틀
 */
const ST_20 = styled(TitleBase)`
  font-size: 2rem;
  font-weight: ${fontWeights.bold};
  line-height: 2.9rem;
`;

/**
 * 소타이틀(18)
 * @description 홈 타이틀
 */
const ST_18 = styled(TitleBase)`
  font-size: 1.8rem;
  font-weight: ${fontWeights.extra_bold};
  line-height: 2.25rem;
`;

/**
 * 소타이틀(16)
 * @description 통계 타이틀
 */
const ST_16 = styled(TitleBase)`
  font-size: 1.6rem;
  font-weight: ${fontWeights.bold};
  line-height: 2.3rem;
`;

/**
 * 내부 텍스트
 * @description props: fontSize=1rem, fontWeight=medium, lineHeight=1.448rem, color=colrs.gray4, style
 */
const Text = styled.div`
  font-family: ${fonts.nato_sans};
  font-size: ${(props) => (!props.fontSize ? `1rem` : props.fontSize)};
	font-weight: ${(props) =>
    !props.fontWeight ? fontWeights.medium : props.fontWeight}
  line-height: ${(props) =>
    !props.lineHeight ? "1.448rem" : props.lineHeight};
	letter-spacing: -0.05rem;
  color: ${(props) => (!props.color ? colors.gray4 : props.color)};
	${(props) =>
    props.style &&
    css`
			{...props.style}
	`}
`;

export { fonts, fontWeights, BT_BASIC, BT_SPECIAL, ST_20, ST_18, ST_16, Text };
