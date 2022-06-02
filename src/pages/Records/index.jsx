/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { Accordion, Button, DatePicker, EmptyState, Select } from 'components';
import Table from 'components/Table';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllData,
  getReport,
  getGateways,
  getProjects,
} from 'redux/attribute';
import { useEffect, useMemo, useState } from 'react';
import currencyFormat, { chartData, getLabels } from 'helpers';
import { tableSchema, tableSchema2 } from './data';

ChartJS.register(ArcElement, Tooltip, Legend);

const Records = () => {
  const [projectHeader, setProjectHeader] = useState('All project');
  const [gateWayHeader, setGateWayHeader] = useState('All gateway');
  const [filterPayload, setFilterPayload] = useState({});
  const [type, setType] = useState('projectId');
  // const [isGenerating, setIsGenerating] = useState(false);
  const [dateActionFrom, setDateActionFrom] = useState(false);
  const [dateActionTo, setDateActionTo] = useState(false);
  const [allTypes, setAllTypes] = useState({});
  const [filterCallPayload, setFilterCallPayload] = useState(null);
  const [activeProject, setActiveProject] = useState({ value: 'select', label: 'Select project' });
  const [activeGateway, setActiveGateway] = useState({ value: 'select', label: 'Select gateway' });

  const checkHeader =
  projectHeader === 'All project' || gateWayHeader === 'All gateway';
  const checkHeader2 =
  projectHeader === 'All project' && gateWayHeader === 'All gateway';
  const checkHeader3 =
  (projectHeader === 'All project' && gateWayHeader === 'All gateway') || (projectHeader !== 'All project' && gateWayHeader !== 'All gateway');

  const schema = useMemo(() => tableSchema, []);
  const schema2 = useMemo(() => tableSchema2, []);
  const { Attribute } = useSelector(({ Attribute }) => ({ Attribute }));
  const projectOptions = (Attribute?.projects?.map((itm) =>
    ({ label: itm?.name, value: itm?.projectId })) || []);
  const gatewayOptions = (Attribute?.gateways?.map((itm) =>
    ({ label: itm?.name, value: itm?.gatewayId })) || []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData({ url: type.split('Id')?.join('s'), id: type, filterPayload }));
    dispatch(getProjects());
    dispatch(getGateways());
  }, []);

  useEffect(() => {
    if (!filterPayload?.from) return;
    if (filterCallPayload?.title) {
      dispatch(getReport({
        allTypes,
        filterPayload,
        filterCallPayload
      }));
      return;
    }
    dispatch(getAllData({ filterPayload, ...filterCallPayload }));
  }, [filterPayload?.to]);

  useEffect(() => {
    if (Attribute?.allProject?.[0]?.data?.length) {
      setActiveProject({ value: 'project', label: 'All project' });
      setActiveGateway({ value: 'gateway', label: 'All gateway' });
    }
  }, [Attribute?.allProject?.[0]?.data]);

  const handleOnchange = ({ target }) => {
    setType(target?.id);

    if (projectOptions.map((val)=> val?.label).includes(target?.options[target?.selectedIndex]?.text)) {
      setAllTypes({ ...allTypes, projectId: target?.value });
    }

    if (gatewayOptions.map((val)=> val?.label).includes(target?.options[target?.selectedIndex]?.text)) {
      setAllTypes({ ...allTypes, gatewayId: target?.value });
    }

    if (projectOptions.map((val)=> val?.label).includes(target?.options[target?.selectedIndex]?.text) && gateWayHeader === 'All gateway') {
      setAllTypes({ ...allTypes, projectId: target?.value });
      setFilterCallPayload({ url: 'gateways', id: 'gatewayId', typeName: 'projectId', typeId: target?.value });
      dispatch(getAllData({ url: 'gateways', id: 'gatewayId', typeName: 'projectId', typeId: target?.value, filterPayload }));
    }

    if (gatewayOptions.map((val)=> val?.label).includes(target?.options[target?.selectedIndex]?.text) && projectHeader === 'All project') {
      setAllTypes({ ...allTypes, gatewayId: target?.value });
      setFilterCallPayload({ url: 'projects', id: 'projectId', typeName: 'gatewayId', typeId: target?.value, });
      dispatch(getAllData({ url: 'projects', id: 'projectId', typeName: 'gatewayId', typeId: target?.value, filterPayload }));
    }

    if (target?.options[target?.selectedIndex]?.text === 'All project') {
      setFilterCallPayload({ url: 'projects', id: 'projectId' });
      dispatch(getAllData({ url: 'projects', id: 'projectId', filterPayload }));
    }
    if (target?.options[target?.selectedIndex]?.text === 'All gateway') {
      setFilterCallPayload({ url: 'gateways', id: 'gatewayId', });
      dispatch(getAllData({ url: 'gateways', id: 'gatewayId', filterPayload, header: gateWayHeader }));
    } else {
      setFilterCallPayload({ title: target?.options[target?.selectedIndex]?.text });
      dispatch(
        getReport({
          allTypes,
          filterPayload,
          title: target?.options[target?.selectedIndex]?.text,
        })
      );
    }

    if (target?.id === 'projectId') {
      setProjectHeader(target?.options[target?.selectedIndex]?.text);
    } else {
      setGateWayHeader(target?.options[target?.selectedIndex]?.text);
    }
  };

  const handleOnchangePicker = ({ target }) => {
    setFilterPayload({
      ...filterPayload,
      [target.id]: target?.value,
    });
  };
  const handleRemoveTo = ()=>{
    setDateActionTo(!dateActionTo);
    setFilterPayload({
      ...filterPayload,
      to: '',
    });
  };

  const handleRemoveFrom = ()=>{
    setDateActionFrom(!dateActionFrom);
    setFilterPayload({
      ...filterPayload,
      from: '',
    });
  };
  return (
    <div className="records" data-testid="records">
      <section className="page-hero flex">
        <div className="page-hero__left" data-testid="">
          <h2 className="page-hero__left--title">Reports</h2>
          <p className="page-hero__left--desc">
            Easily generate a report of your transactions
          </p>
        </div>
        <div className="flex">
          <Select
            options={projectOptions}
            id="projectId"
            onChange={handleOnchange}
            placeholder="Select project"
            active={activeProject}
          />
          <Select
            options={gatewayOptions}
            id="gatewayId"
            onChange={handleOnchange}
            placeholder="Select gateway"
            active={activeGateway}
          />
          <DatePicker
            id="from"
            onChange={handleOnchangePicker}
            value={filterPayload?.from}
            action={handleRemoveFrom}
          />
          <DatePicker
            id="to"
            onChange={handleOnchangePicker}
            placeholder="To date"
            value={filterPayload?.to}
            action={handleRemoveTo}
          />
          <Button
            variant="secondary"
            className="isGenerating"
            // onClick={() => setIsGenerating(!isGenerating)}
          >
            Generate report
          </Button>
        </div>
      </section>

      {!Attribute?.loading && !Attribute?.allProject?.[0]?.data?.length ? (
        <section className="records--empty">
          <EmptyState />
        </section>
      ) : null}

      {Attribute?.allProject?.[0]?.data?.length ? (
        <section className="records__content">
          <div
            className={`records__content--width ${!checkHeader2 && !checkHeader3 ? '' : 'override'}`}
            data-testid="records-content"
          >
            <div className="records__content__block">
              <p className="bold records__content__block--header">
                {projectHeader}
                {' '}
                |
                {' '}
                {gateWayHeader}
              </p>
              {checkHeader ? (
                <Accordion titleData={Attribute?.allProject} loading={Attribute?.loading}>
                  {Attribute?.allProject?.map(({ data }, idx) => (
                    <div key={idx}>
                      <Table
                        schema={checkHeader2 ? schema : schema2}
                        data={data || []}
                        loading={Attribute?.loading}
                        col={checkHeader2 ? schema?.length : schema2?.length}
                      />
                    </div>
                  ))}
                </Accordion>
              ) : (
                <Table
                  schema={checkHeader2 ? schema : schema2}
                  data={Attribute?.allProject?.[0]?.data || []}
                  loading={Attribute?.loading}
                  cols={checkHeader2 ? schema?.length : schema2?.length}
                />
              )}
            </div>
            {(checkHeader3) && (
            <div className="records__content--footer">
              <p className="bold">
                Total:
                {' '}
                {currencyFormat(Attribute?.allProject?.reduce((current, next)=>
                  next.total + current, 0))}
              </p>
            </div>
            )}
          </div>

          {(!checkHeader2 && !checkHeader3) && (
          <div className="records__content--chart" data-testid="records__content--chart">
            <div className="records__content--footer label">
              {getLabels(Attribute?.allProject)?.map((itm) => (
                <div key={itm?.color} className="label--inner p small">
                  <div className="color" style={{ backgroundColor: itm?.color }} />
                  {itm?.name}
                </div>
              ))}
            </div>
            <div className="records__content--chart--width">
              <div className="records__content--chart--width--inner">
                <Doughnut data={chartData(Attribute?.allProject)} />
              </div>
            </div>
            <div className="records__content--footer" data-testid="records__content--footer">
              <p className="bold">
                {type.split('Id')?.join(' ')}
                {' '}
                TOTAL |
                {' '}
                {currencyFormat(Attribute?.allProject?.reduce((current, next)=>
                  next.total + current, 0))}
              </p>
            </div>
          </div>
          )}
        </section>
      ) : null}
    </div>
  );
};

export default Records;
