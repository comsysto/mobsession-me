import React, { FC, useState } from "react";
import styled from "styled-components";
import { useObservable } from "../../../../utils/useObservable";
import { useMobSessionService } from "../../../../utils/useMobSessionService";
import { ClickableGroup } from "../../../common/svg/ClickableGroup";
import { ParticipantRole } from "../../../../domain/ParticipantRole";
import { PersonIcon } from "../../../common/svg/icons/PersonIcon";
import { Participant } from "../../../../domain/Participant";
import { KeyboardIcon } from "../../../common/svg/icons/KeyboardIcon";
import { PersonDashIcon } from "../../../common/svg/icons/PersonDashIcon";
import { CircularButton } from "../../../common/svg/CircularButton";
import { Transform } from "../../../common/svg/Transform";
import { SpeakerIcon } from "../../../common/svg/icons/SpeakerIcon";

interface Props {}

// eslint-disable-next-line no-empty-pattern
export const ParticipantControls: FC<Props> = ({}: Props) => {
  const mobSessionService = useMobSessionService();
  const participants = useObservable("ParticipantControls.participants$", mobSessionService.participants$, []);
  const me = useObservable("ParticipantControls.me$", mobSessionService.me$, null);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  return (
    <g>
      {selectedParticipant && (
        <rect
          data-testid="participant-background"
          x={-10}
          y={-10}
          width={20}
          height={20}
          opacity={0.8}
          fill="#FFFFFF"
          onClick={() => setSelectedParticipant(null)}
        />
      )}
      <g>
        {participants.map((participant, index) => {
          const isMe = me === participant;
          const isDriver = participant.role === ParticipantRole.DRIVER;
          const isNavigator = participant.role === ParticipantRole.NAVIGATOR;
          const isSelected = participant === selectedParticipant;
          const iconColor = isMe ? "#00c4a7" : "#AAAAAA";

          return (
            <g key={participant.id}>
              <Transform x={-1.1 + index * 0.2} y={0.2}>
                {isSelected && (
                  <g>
                    {isDriver && (
                      <StyledTitleText x="0.2" y="-0.45" textAnchor="middle">
                        Driver
                      </StyledTitleText>
                    )}
                    {isNavigator && (
                      <StyledTitleText x="0.2" y="-0.45" textAnchor="middle">
                        Navigator
                      </StyledTitleText>
                    )}
                    <StyledNameText x="0.2" y="-0.32" textAnchor="middle">
                      {participant.name}
                    </StyledNameText>
                    <rect fill="#999999" width={0.4} height={1} rx={0.05} y={-0.3} />
                    <polygon fill="#999999" points="0.1,0.7 0.2,0.8 0.3,0.7" />
                    <CircularButton
                      title="Make to Navigator"
                      cx={0.2}
                      cy={-0.1}
                      r={0.1}
                      onClick={() => {
                        mobSessionService.updateParticipantToNavigator(participant);
                        setSelectedParticipant(null);
                      }}>
                      <SpeakerIcon data-testid="navigator-icon" />
                    </CircularButton>
                    <CircularButton
                      title="Make to Driver"
                      cx={0.2}
                      cy={0.2}
                      r={0.1}
                      onClick={() => {
                        mobSessionService.updateParticipantToDriver(participant);
                        setSelectedParticipant(null);
                      }}>
                      <KeyboardIcon data-testid="driver-icon" />
                    </CircularButton>
                    <CircularButton
                      title="Remove from Session"
                      cx={0.2}
                      cy={0.5}
                      r={0.1}
                      onClick={() => {
                        mobSessionService.updateRemoveParticipant(participant);
                        setSelectedParticipant(null);
                      }}>
                      <PersonDashIcon data-testid="delete-icon" />
                    </CircularButton>
                  </g>
                )}
                <ClickableGroup
                  data-testid="clickable-group"
                  title={`${participant.name} (${participant.role})`}
                  cx={0.2}
                  cy={0.9}
                  r={0.15}
                  onClick={() => setSelectedParticipant(participant)}>
                  <rect fill="#EEEEEE" x={-0.45} y={-0.45} width={0.9} height={1.5} rx={0.2} />
                  <g opacity={isDriver ? 0.5 : 1}>
                    <PersonIcon data-testid="person-icon" fill={iconColor} />
                  </g>
                  {isMe ? (
                    <StyledSmallMeText x="0" y="1" textAnchor="middle">
                      me
                    </StyledSmallMeText>
                  ) : (
                    <StyledSmallNameText x="0" y="1" textAnchor="middle">
                      {participant.name.substr(0, 2)}
                    </StyledSmallNameText>
                  )}
                  <Transform y={1.5} scale={0.7}>
                    {isDriver && <KeyboardIcon data-testid="keyboard-icon" fill={iconColor} />}
                  </Transform>
                  <Transform y={1.5} scale={0.7}>
                    {isNavigator && <SpeakerIcon data-testid="speaker-icon" fill={iconColor} />}
                  </Transform>
                </ClickableGroup>
              </Transform>
            </g>
          );
        })}
      </g>
    </g>
  );
};
const StyledSmallNameText = styled.text`
  font-family: "Arial", sans-serif;
  font-size: 0.5px;
`;

const StyledSmallMeText = styled.text`
  font-family: "Arial", sans-serif;
  font-size: 0.5px;
  font-style: italic;
  fill: #02b490;
`;

const StyledNameText = styled.text`
  font-family: "Arial", sans-serif;
  font-size: 0.1px;
`;
const StyledTitleText = styled.text`
  font-family: "Arial", sans-serif;
  font-style: italic;
  font-size: 0.06px;
`;
