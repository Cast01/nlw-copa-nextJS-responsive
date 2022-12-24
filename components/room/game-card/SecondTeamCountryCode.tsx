import getUnicodeFlagIcon from 'country-flag-icons/unicode'

export interface SecondTeamCountryCodePropsType {
    secondTeamCountryCode: string,
}

export function SecondTeamCountryCode({secondTeamCountryCode}: SecondTeamCountryCodePropsType) {
    return (
        <span>{getUnicodeFlagIcon(secondTeamCountryCode)}</span>
    );
}