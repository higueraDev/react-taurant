export interface IGetCategoriesResponse {
	categories: ICategory[];
}

export interface ICategory {
	id: string;
	alias: string;
	title: string;
	parent_aliases: string[];
	country_whitelist: CountryList[];
	country_blacklist: CountryList[];
}

export enum CountryList {
	Ar = "AR",
	At = "AT",
	Au = "AU",
	Be = "BE",
	Br = "BR",
	CA = "CA",
	Ch = "CH",
	Cl = "CL",
	Cz = "CZ",
	De = "DE",
	Dk = "DK",
	Es = "ES",
	Fi = "FI",
	Fr = "FR",
	GB = "GB",
	Hk = "HK",
	Ie = "IE",
	It = "IT",
	Jp = "JP",
	MX = "MX",
	My = "MY",
	Nl = "NL",
	No = "NO",
	Nz = "NZ",
	PR = "PR",
	Ph = "PH",
	Pl = "PL",
	Pt = "PT",
	SE = "SE",
	Sg = "SG",
	Tr = "TR",
	Tw = "TW",
	Us = "US",
}
