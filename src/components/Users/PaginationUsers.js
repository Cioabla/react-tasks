import React, {Component} from 'react';
import {PaginationLink,PaginationItem,Pagination,Input , Label , Form , FormGroup , Col , Row} from 'reactstrap';
import PropTypes from "prop-types";


export default class PaginationUsers extends Component {
    static propTypes = {
        pg: PropTypes.func.isRequired,
    };

    _pg = (page) => {
        const {pg} = this.props;

        pg && pg (page);
    };

    _onChangeFilter = (e) => {
        const {onChangeFilter} = this.props;

        onChangeFilter && onChangeFilter(e);
    };

    _createPagination = (last_page) => {
        const items = [];

        for (let i = 1; i <= last_page; i++)
        {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => this._pg(i)}>{i}</PaginationLink>
                </PaginationItem>
            )
        }

        return items;
    };

    _prevPg = (current_page) => {
        if(current_page === 1)
        {
            return <PaginationItem>
                <PaginationLink previous disabled onClick={() => this._pg(current_page-1)} />
            </PaginationItem>
        }else{
            return <PaginationItem>
                <PaginationLink previous onClick={() => this._pg(current_page-1)} />
            </PaginationItem>
        }
    };

    _nextPg = (current_page , last_page) => {
        if(current_page === last_page)
        {
            return <PaginationItem>
                <PaginationLink next disabled onClick={() => this._pg(current_page+1)} />
            </PaginationItem>
        }else{
            return <PaginationItem>
                <PaginationLink next onClick={() => this._pg(current_page+1)} />
            </PaginationItem>
        }
    };

    render() {
        const {current_page , last_page , total_users , filter , isFilter} = this.props;

        return (
                <Row>
                    <Col md={9}>
                        <Pagination className={'paginationDiv'}>
                            <PaginationItem disabled className={'currentPg'}>
                                <PaginationLink disabled>Pg: {current_page}</PaginationLink>
                            </PaginationItem>
                            {this._prevPg(current_page)}
                            {this._createPagination(last_page)}
                            {this._nextPg(current_page , last_page)}
                            <PaginationItem className={'totalUsers'}>
                                <PaginationLink disabled>Users: {total_users}</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Col>
                    {isFilter && <Col md={3}>
                        <Pagination>
                        <PaginationItem className={'filter'}>
                            <Form className={'filter'}>
                                <FormGroup row>
                                    <Label className={'selectFilter'} for="filter" sm={5}>Filter by:</Label>
                                    <Col className={'selectOption'} sm={7}>
                                        <Input className={'selectFilter'} type="select"
                                               name="filter"
                                               id="filter"
                                               onChange={this._onChangeFilter}
                                               value={filter}>
                                            <option value={''}>All</option>
                                            <option value={'Admins'}>Admins</option>
                                            <option value={'Users'}>Users</option>
                                            <option value={'Inactive'}>Inactive</option>
                                            <option value={'Active'}>Active</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </PaginationItem>
                        </Pagination>
                    </Col>}
                </Row>
        );
    }
}