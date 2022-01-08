import styled from "styled-components";
import { withStyles, Button } from "@material-ui/core";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Title = styled.h5`
  margin: 0 auto 2rem 0;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  font-size: 1.5rem;
`;

export const FormItem = styled.div`
  margin: 1.5rem 0;
`;

export const StyledButton = withStyles({
  root: {
    textTransform: "none",
  },
  text: {
    border: "2px solid #69b595 !important",
    background: "white !important",
    borderRadius: "30px !important",
    fontSize: "1rem",
    padding: "1em !important",
    width: "70%",
  },
})(Button);
