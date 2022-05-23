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
import currencyFormat from 'helpers';
import { chartData, labels, tableSchema, tableSchema2 } from './data';

ChartJS.register(ArcElement, Tooltip, Legend);

const Records = () => {
  const [projectHeader, setProjectHeader] = useState('All project');
  const [gateWayHeader, setGateWayHeader] = useState('All gateway');
  const [gateWayId, setGateWayId] = useState(null);
  const [filterPayload, setFilterPayload] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeProject, setActiveProject] = useState({ value: 'select', label: 'Select project' });
  const [activeGateway, setActiveGateway] = useState({ value: 'select', label: 'Select gateway' });

  const checkHeader =
  projectHeader === 'All project' || gateWayHeader === 'All gateway';
  const checkHeader2 =
  projectHeader === 'All project' && gateWayHeader === 'All gateway';

  const schema = useMemo(() => tableSchema, []);
  const schema2 = useMemo(() => tableSchema2, []);
  const { Attribute } = useSelector(({ Attribute }) => ({ Attribute }));
  const projectOptions = (Attribute?.projects?.map((itm) =>
    ({ label: itm?.name, value: itm?.projectId })) || []);
  const gatewayOptions = (Attribute?.gateways?.map((itm) =>
    ({ label: itm?.name, value: itm?.gatewayId })) || []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData({ url: 'projects', id: 'projectId', filterPayload }));
    dispatch(getProjects());
    dispatch(getGateways());
  }, []);

  useEffect(() => {
    if (Attribute?.allProject?.[0]?.data?.length) {
      setActiveProject({ value: 'project', label: 'All project' });
      setActiveGateway({ value: 'gateway', label: 'All gateway' });
    }
  }, [Attribute?.allProject?.[0]?.data]);

  const handleOnchange = ({ target }) => {
    setFilterPayload({
      ...filterPayload,
      [target.id]: target?.value,
    });

    if (target?.options[target?.selectedIndex]?.text === 'All project') {
      dispatch(getAllData({ url: 'projects', id: projectId, filterPayload }));
    }
    if (target?.options[target?.selectedIndex]?.text === 'All gateway') {
      dispatch(getAllData({ url: 'gateways', id: gateWayId, filterPayload }));
    } else {
      dispatch(
        getReport({
          idType: target?.id,
          filterPayload,
          title: target?.options[target?.selectedIndex]?.text,
        })
      );
      setGateWayId(target?.value);
    }

    if (target?.id === 'projectId') {
      setProjectHeader(target?.options[target?.selectedIndex]?.text);
      setProjectId(target?.value);
    } else {
      setGateWayHeader(target?.options[target?.selectedIndex]?.text);
      setGateWayId(target?.value);
    }
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
          <DatePicker id="from" onChange={handleOnchange} />
          <DatePicker
            id="to"
            onChange={handleOnchange}
            placeholder="To date"
          />
          <Button
            variant="secondary"
            className="isGenerating"
            onClick={() => setIsGenerating(!isGenerating)}
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
            className={`records__content--width ${isGenerating ? '' : 'override'}`}
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
            {checkHeader2 && (
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

          {isGenerating && (
          <div className="records__content--chart" data-testid="records__content--chart">
            <div className="records__content--footer label">
              {labels?.map((itm) => (
                <div key={itm?.color} className="label--inner p small">
                  <div className="color" style={{ backgroundColor: itm?.color }} />
                  {itm?.label}
                </div>
              ))}
            </div>
            <div className="records__content--chart--width">
              <div className="records__content--chart--width--inner">
                <Doughnut data={chartData} />
              </div>
            </div>
            <div className="records__content--footer" data-testid="records__content--footer">
              <p className="bold">GATEWAY TOTAL | 14,065 USD</p>
            </div>
          </div>
          )}
        </section>
      ) : null}
    </div>
  );
};

export default Records;
