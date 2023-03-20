import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import colors from "./colors";
import { fonts, fontWeights } from "./Typography";

const GlobalStyle = createGlobalStyle`
	${reset}

	html {
		font-size: 62.5%; // 1rem = 10px 로 변경 한 것, 바꾼 이유는 사파리에서 폰트가 너무 작은것은 허용하지 않기 때문.
	}

	body * {  
	background: ${colors.white_bg};
	font-family: ${fonts.nato_sans};
	font-style: normal;
	font-weight: ${fontWeights.medium};
	font-size: 1.4rem;
	line-height: 1.448rem;
	color: ${colors.black_main};
}
`;

export default GlobalStyle;
