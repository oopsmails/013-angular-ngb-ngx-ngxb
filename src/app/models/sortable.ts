export interface ColumnHeader {
	column: any;
	direction: SortDirection;
}

export enum SortDirection {
	Asc = 'asc',
	Desc = 'desc',
	Default = 'default',
}

export interface ColumnSortedEvent {
	column: any;
	direction: SortDirection;
}