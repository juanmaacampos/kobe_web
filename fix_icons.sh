#!/bin/bash
sed -i '/\.landing-list-icon {/,/}/c\
.landing-list-icon {\
  font-size: 1.6rem;\
  color: var(--color-accent);\
  opacity: 0.7;\
  margin-right: 1.5rem;\
  display: flex;\
  align-items: center;\
  justify-content: center;\
}' src/components/LandingModal/landingModal.css
