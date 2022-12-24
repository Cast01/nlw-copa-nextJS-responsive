import { getName } from 'country-list';
import { SecondTeamCountryCodePropsType } from './SecondTeamCountryCode';


export function SecondTeamCountryName({secondTeamCountryCode}: SecondTeamCountryCodePropsType) {
    return (
        <div className="truncate">{getName(secondTeamCountryCode)}</div>
    );
}