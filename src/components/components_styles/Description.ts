import styled from "styled-components";

export const Description = styled.p`
  margin-top: 2rem;
  margin-bottom: 1rem !important;
  color: ${props => props.theme.colors.textLight};
  font-size: 1.15rem;
`;

export const DescriptionSmall = styled.p`
  margin-top: 2rem;
  margin-bottom: 1rem !important;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;
