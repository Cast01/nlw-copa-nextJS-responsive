import getUnicodeFlagIcon from 'country-flag-icons/unicode'

export interface FirstTeamCountryCodePropsType {
    firstTeamCountryCode: string,
}

export function FirstTeamCountryCode({firstTeamCountryCode}: FirstTeamCountryCodePropsType) {
    return (
        <span>{getUnicodeFlagIcon(firstTeamCountryCode)}</span>
    );
}